#!/usr/bin/env python
#-*- coding: UTF-8 -*-
import json
from reportlab.lib import colors
from reportlab.platypus import Paragraph, SimpleDocTemplate, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

def makePdf(fileName = "КП.pdf", title = "Комерческое предложение", items = [[1,"name","discription",123, 1]]):
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
    story.append(Paragraph('ООО "АЙДОС и КО"', styles["Normal"]))
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
def formPdfFromList(ids):
    items = []
    for i in range(len(ids)):
        items.append(findInJson(ids[i]))
    makePdf(items)
def findInJson(jsonText, findId):
    dic = json.loads(jsonText)
    products = dic["products"]
    for i in range(len(products)):
        if (products["id"] == findId):
            return products["id"]

content = None
with open('apiresp.json', 'r') as content_file:
    content = content_file.read()
formPdfFromList(content)
#{
#   "group_id": 0,
#   "products": [
#     {
#       "id": 660913934,
#       "external_id": "string",
#       "name": "Вечернее платье",
#       "name_multilang": {
#         "ru": "Наименование товара на русском языке",
#         "kk": "Наименование товара на казахском языке"
#       },
#       "sku": "AA7775",
#       "keywords": "Платье, коктейльное платье",
#       "description": "Коктейльное платье или платье-коктейль — укороченное женское платье\nдля торжественных случаев без воротника и рукавов.\n",
#       "description_multilang": {
#         "ru": "Описание товара на русском языке",
#         "kk": "Описание товара на казахском языке"
#       },
#       "selling_type": "universal",
#       "presence": "available",
#       "regions": [
#         {
#           "id": 194014000,
#           "name": "region name",
#           "name_multilang": {
#             "ru": "Наименование региона на русском языке",
#             "kk": "Наименование региона на казахском языке"
#           }
#         }
#       ],
#       "price": 150,
#       "minimum_order_quantity": 0,
#       "discount": {
#         "value": 15,
#         "type": "percent",
#         "date_start": "22.03.2018",
#         "date_end": "22.04.2018"
#       },
#       "currency": "USD",
#       "group": {
#         "id": 2366571,
#         "name": "Корневая группа",
#         "name_multilang": {
#           "ru": "Название группы на русском языке",
#           "kk": "Название группы на казахском языке"
#         }
#       },
#       "category": {
#         "id": 35402,
#         "caption": "Платья женские"
#       },
#       "prices": [
#         {
#           "price": 100.75,
#           "minimum_order_quantity": 10
#         }
#       ],
#       "main_image": "https://my.example.com/media/images/1075345153_w200_h200_dress.jpg",
#       "images": [
#         {
#           "url": "https://my.example.com/media/images/1075345152_w200_h200_dress_front.png",
#           "thumbnail_url": "https://my.example.com/media/images/1075345152_w100_h100_dress_front.png",
#           "id": 1075345152
#         }
#       ],
#       "status": "on_display",
#       "quantity_in_stock": 123,
#       "measure_unit": "шт.",
#       "is_variation": false,
#       "variation_base_id": 123123123,
#       "variation_group_id": 321321
#     }
#   ]
# }