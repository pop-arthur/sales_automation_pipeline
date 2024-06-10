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
    if (len(items)<=0):
        print("Items list is empty")
        return
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
    column_widths = [60, 150, 150, 40, 80]
    for item in items:
        item[1] = Paragraph(item[1], styles["Normal"])
        try:
            item[2] = Paragraph(item[1], styles["Normal"])
        except:
          item[2] = Paragraph("-", styles["Normal"])
          print("An exception occurred")
        if (item[3] == None):
            item[3] = Paragraph("-", styles["Normal"])
        if (item[4] == None):
            item[4] = Paragraph("-", styles["Normal"])
    items.insert(0, ["id", Paragraph("Наименование", styles["Normal"]), Paragraph("Описание", styles["Normal"]),Paragraph("Цена", styles["Normal"]),Paragraph("Доступное количество", styles["Normal"])])
    t = Table(
        items, colWidths=column_widths
    )
    t.setStyle(TableStyle([('ALIGN',(1,1),(-2,-2),'CENTER'),
                        ('INNERGRID', (0,0), (-1,-1), 0.25, colors.black),
                        ('BOX', (0,0), (-1,-1), 0.25, colors.black),
                        ]))
    story.append(t)
    story.append(Paragraph('Итого: ' + str(countItemsPrice(items)), styles["Normal"]))
    doc.build(story)
def countItemsPrice(items):
    price = 0
    for item in items:
        if (len(item) == 5 and not isinstance(item[3], Paragraph) and not isinstance(item[4], Paragraph) and item[0] != "id"):
          price += item[3]*items[4]
    return price
def formPdfFromList(ids): #Формирование КП на вход idишники -> на выход pdf'ка
    items = []
    jsontext = loadJson()
    for i in range(len(ids)):
        var = findInJson(ids[i], jsontext)
        if var!=None:
            toAppend = [var["id"], var["name"],var["description"], var["price"], var["quantity_in_stock"]]
            items.append(toAppend)
    makePdf(items=items)
def findInJson(findId, jsonText = None): #На вход: опционально json с продуктами и id для поиска -> на выход конкретный продукт из json'ая
    if (jsonText == None):
        jsonText = loadJson()
    dic = json.loads(jsonText)
    products = dic["products"]
    for product in dic.get('products', []):
        if product['id'] == findId:
            return product
    return None
def loadJson():
    file_path = "apiresp.json"
    with open(file_path, 'r', encoding='utf-8') as file:
      data = file.read().rstrip()
    jsonText = data
    jsonText = jsonText.replace("\n","")
    return jsonText
if __name__ == "__main__":
  formPdfFromList([115900610, 109158468]) #test code. #delete before production