import jsPDF from 'jspdf'
import type { Theme, Tier } from './data'
import { tierLabel, tierDescription } from './data'

export type ReportData = {
  profile: {
    name: string
    company: string
    email: string
    whatsapp: string
  }
  overall: number // 0..100
  byTheme: Array<{ theme: Theme; score: number; tier: Tier; recommendations: string[] }>
}

/** Paleta Strategia */
const INK = { r: 13, g: 59, b: 69 }
const TEAL = { r: 43, g: 155, b: 168 }
const TEAL_LIGHT = { r: 56, g: 189, b: 203 }
const INK_MUTED = { r: 108, g: 128, b: 134 }

export function generatePdf(data: ReportData): jsPDF {
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = pdf.internal.pageSize.getWidth()
  const H = pdf.internal.pageSize.getHeight()
  const margin = 48
  const contentW = W - margin * 2

  // === PÁGINA 1: Portada ===
  pdf.setFillColor(INK.r, INK.g, INK.b)
  pdf.rect(0, 0, W, H, 'F')

  // Logo tipográfico
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(32)
  pdf.text('STRATEGIA', margin, 120)
  pdf.setFontSize(10)
  pdf.setTextColor(TEAL_LIGHT.r, TEAL_LIGHT.g, TEAL_LIGHT.b)
  pdf.text('Consultoría · Innovación', margin, 138)

  // Kicker
  pdf.setFontSize(9)
  pdf.setTextColor(TEAL_LIGHT.r, TEAL_LIGHT.g, TEAL_LIGHT.b)
  pdf.text('DIAGNÓSTICO EMPRESARIAL 360°', margin, 240)

  // Título
  pdf.setFontSize(26)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(255, 255, 255)
  pdf.text('Lectura estratégica', margin, 290)
  pdf.text('de su organización', margin, 322)

  // Datos cliente
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.setTextColor(200, 200, 200)
  pdf.text(`Preparado para`, margin, 400)
  pdf.setFontSize(14)
  pdf.setTextColor(255, 255, 255)
  pdf.text(data.profile.name, margin, 420)
  pdf.setFontSize(11)
  pdf.setTextColor(200, 200, 200)
  pdf.text(data.profile.company, margin, 438)

  // Fecha + contacto
  const today = new Date().toLocaleDateString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
  pdf.setFontSize(9)
  pdf.setTextColor(TEAL_LIGHT.r, TEAL_LIGHT.g, TEAL_LIGHT.b)
  pdf.text(today.toUpperCase(), margin, H - 100)
  pdf.setTextColor(200, 200, 200)
  pdf.text('strategiaconsultoriasas@gmail.com · WhatsApp +57 320 304 7445', margin, H - 85)
  pdf.text('www.strategiaconsultoria.co', margin, H - 70)

  // Puntaje general grande
  pdf.setFontSize(100)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(TEAL_LIGHT.r, TEAL_LIGHT.g, TEAL_LIGHT.b)
  const scoreTxt = `${Math.round(data.overall)}`
  pdf.text(scoreTxt, W - margin, 290, { align: 'right' })
  pdf.setFontSize(20)
  pdf.text('/100', W - margin, 322, { align: 'right' })
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(200, 200, 200)
  pdf.text('ÍNDICE DE MADUREZ ESTRATÉGICA', W - margin, 348, { align: 'right' })

  // === PÁGINA 2: Resumen ===
  pdf.addPage()
  pdf.setFillColor(253, 253, 251)
  pdf.rect(0, 0, W, H, 'F')

  pdf.setTextColor(TEAL.r, TEAL.g, TEAL.b)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CAPÍTULO 01 · RESUMEN EJECUTIVO', margin, 60)

  pdf.setTextColor(INK.r, INK.g, INK.b)
  pdf.setFontSize(22)
  pdf.text('Dónde está hoy su organización', margin, 100)

  pdf.setFontSize(11)
  pdf.setTextColor(INK_MUTED.r, INK_MUTED.g, INK_MUTED.b)
  const resumenText = pdf.splitTextToSize(
    'A continuación encontrará los nueve ejes evaluados y la lectura por cada uno. ' +
    'Un puntaje bajo no es un juicio: es la primera palanca donde intervenir. ' +
    'Un puntaje alto marca el frente desde el cual proyectar la ventaja competitiva.',
    contentW,
  )
  pdf.text(resumenText, margin, 130)

  // Tabla de puntajes
  let y = 220
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(INK_MUTED.r, INK_MUTED.g, INK_MUTED.b)
  pdf.text('EJE', margin, y)
  pdf.text('PUNTAJE', W - margin - 80, y, { align: 'right' })
  pdf.text('ESTADO', W - margin, y, { align: 'right' })
  y += 8
  pdf.setDrawColor(220, 220, 220)
  pdf.line(margin, y, W - margin, y)
  y += 14

  pdf.setFont('helvetica', 'normal')
  for (const row of data.byTheme) {
    pdf.setTextColor(INK.r, INK.g, INK.b)
    pdf.setFontSize(11)
    pdf.text(row.theme.label, margin, y)

    pdf.setTextColor(TEAL.r, TEAL.g, TEAL.b)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${Math.round(row.score)}%`, W - margin - 80, y, { align: 'right' })
    pdf.setFont('helvetica', 'normal')

    pdf.setTextColor(INK_MUTED.r, INK_MUTED.g, INK_MUTED.b)
    pdf.setFontSize(10)
    pdf.text(tierLabel(row.tier), W - margin, y, { align: 'right' })

    // Barra de progreso
    const barW = contentW - 180
    const barX = margin + 160
    pdf.setFillColor(230, 232, 234)
    pdf.rect(barX, y + 4, barW, 3, 'F')
    pdf.setFillColor(TEAL_LIGHT.r, TEAL_LIGHT.g, TEAL_LIGHT.b)
    pdf.rect(barX, y + 4, barW * (row.score / 100), 3, 'F')

    y += 24
  }

  // === PÁGINAS POR TEMA ===
  for (const row of data.byTheme) {
    pdf.addPage()
    pdf.setFillColor(253, 253, 251)
    pdf.rect(0, 0, W, H, 'F')

    pdf.setTextColor(TEAL.r, TEAL.g, TEAL.b)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`EJE · ${row.theme.label.toUpperCase()}`, margin, 60)

    pdf.setTextColor(INK.r, INK.g, INK.b)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(28)
    pdf.text(row.theme.label, margin, 100)

    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(INK_MUTED.r, INK_MUTED.g, INK_MUTED.b)
    const descLines = pdf.splitTextToSize(row.theme.description, contentW - 120)
    pdf.text(descLines, margin, 125)

    // Puntaje
    pdf.setFontSize(42)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(TEAL.r, TEAL.g, TEAL.b)
    pdf.text(`${Math.round(row.score)}%`, W - margin, 110, { align: 'right' })
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(INK_MUTED.r, INK_MUTED.g, INK_MUTED.b)
    pdf.text(tierLabel(row.tier).toUpperCase(), W - margin, 128, { align: 'right' })

    // Lectura del tier
    pdf.setDrawColor(TEAL_LIGHT.r, TEAL_LIGHT.g, TEAL_LIGHT.b)
    pdf.setLineWidth(2)
    pdf.line(margin, 170, margin + 24, 170)
    pdf.setLineWidth(0.5)
    pdf.setFont('helvetica', 'italic')
    pdf.setFontSize(11)
    pdf.setTextColor(INK.r, INK.g, INK.b)
    const tierLines = pdf.splitTextToSize(tierDescription(row.tier), contentW)
    pdf.text(tierLines, margin, 190)

    // Recomendaciones
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(13)
    pdf.setTextColor(INK.r, INK.g, INK.b)
    pdf.text('Recomendaciones concretas', margin, 260)

    let recY = 290
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(11)
    for (let i = 0; i < row.recommendations.length; i++) {
      // número
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(TEAL.r, TEAL.g, TEAL.b)
      pdf.text(`${String(i + 1).padStart(2, '0')}`, margin, recY)
      // texto
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(INK.r, INK.g, INK.b)
      const recLines = pdf.splitTextToSize(row.recommendations[i], contentW - 40)
      pdf.text(recLines, margin + 32, recY)
      recY += recLines.length * 14 + 14
    }

    // Footer de página
    pdf.setFontSize(8)
    pdf.setTextColor(INK_MUTED.r, INK_MUTED.g, INK_MUTED.b)
    pdf.text(
      `${data.profile.company} · Diagnóstico Strategia 360° · ${today}`,
      margin,
      H - 30,
    )
    pdf.text(`${pdf.getCurrentPageInfo().pageNumber}`, W - margin, H - 30, { align: 'right' })
  }

  // === PÁGINA FINAL: Siguiente paso ===
  pdf.addPage()
  pdf.setFillColor(INK.r, INK.g, INK.b)
  pdf.rect(0, 0, W, H, 'F')

  pdf.setTextColor(TEAL_LIGHT.r, TEAL_LIGHT.g, TEAL_LIGHT.b)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EL SIGUIENTE PASO', margin, 100)

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(28)
  pdf.setTextColor(255, 255, 255)
  pdf.text('Agende una conversación con', margin, 150)
  pdf.text('el equipo consultor.', margin, 184)

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(12)
  pdf.setTextColor(220, 220, 220)
  const nextSteps = pdf.splitTextToSize(
    'Este diagnóstico es el punto de partida. En 30 minutos — sin costo — podemos ' +
    'revisar los dos ejes más críticos de su organización y proponer una hoja de ruta ' +
    'concreta de intervención.',
    contentW,
  )
  pdf.text(nextSteps, margin, 230)

  pdf.setFontSize(10)
  pdf.setTextColor(TEAL_LIGHT.r, TEAL_LIGHT.g, TEAL_LIGHT.b)
  pdf.text('CANALES DE CONTACTO', margin, 340)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(255, 255, 255)
  pdf.text('WhatsApp Business · +57 320 304 7445', margin, 365)
  pdf.text('strategiaconsultoriasas@gmail.com', margin, 390)
  pdf.text('www.strategiaconsultoria.co', margin, 415)

  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(150, 150, 150)
  pdf.text(
    'Strategia Consultoría e Innovación · Yopal, Casanare · Colombia',
    margin,
    H - 60,
  )
  pdf.text(
    'Transformamos la incertidumbre en ventaja competitiva.',
    margin,
    H - 44,
  )

  return pdf
}
