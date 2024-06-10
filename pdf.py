#!/usr/bin/env python
#-*- coding: UTF-8 -*-

from reportlab.lib import colors
from reportlab.platypus import Paragraph, SimpleDocTemplate, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

def makePdf(fileName = "КП.pdf", title = "Комерческое предложение", items = [["name","discription",123, 1]]):
    styles = getSampleStyleSheet() # дефолтовые стили
    # the magic is here
    styles['Normal'].fontName='DejaVuSerif'
    styles['Heading1'].fontName='DejaVuSerif'

    pdfmetrics.registerFont(TTFont('DejaVuSerif','DejaVuSerif.ttf', 'UTF-8'))

    doc = SimpleDocTemplate(filename = fileName,
                            pagesize = A4,
                            title=title)

    story = []  # словарь документа

    # текст
    story.append(Paragraph(title, styles["Heading1"]))
    story.append(Paragraph('Привет мир!', styles["Normal"]))
    # таблица русская
    t = Table(
        items
    )

    t.setStyle(TableStyle([('ALIGN',(1,1),(-2,-2),'RIGHT'),
                        ('INNERGRID', (0,0), (-1,-1), 0.25, colors.black),
                        ('BOX', (0,0), (-1,-1), 0.25, colors.black),
                        ]))
    story.append(t)

    doc.build(story)
makePdf()