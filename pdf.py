#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import json
from reportlab.lib import colors
from reportlab.platypus import Paragraph, SimpleDocTemplate, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import csv


def make_csv(fileName="КП.csv", title="Комерческое предложение", items=[[1, "name", "discription", 123, 1]],
             name="name", phone="88005553535", mail="a@a.com"):  # делаем csv из листа items
    items.insert(0, ["id", "Имя", "Описание", "Цена", "Доступное количество"])
    items.insert(0, [title, "ФИО:", name, "Телефон:", phone, "Почта:", mail])
    try:
        with open(fileName.replace(".pdf", ".csv"), 'w') as f:
            writer = csv.writer(f)
            for row in items:
                if (row[2][0] == "<"):
                    row[2] = "-"
                if (row[3] == None):
                    row[3] = "-"
                if (row[4] == None):
                    row[4] = "-"
                writer.writerow(row)
    except:
        print("Probably your file is opened. Please close it and try one more time")


def make_pdf(fileName="КП.pdf", title="Комерческое предложение", items=[[1, "name", "discription", 123, 1]],
             name="name", phone="88005553535", mail="a@a.com"):
    if (len(items) <= 0):
        print("Items list is empty")
        return
    styles = getSampleStyleSheet()  # дефолтовые стили
    # the magic is here
    styles['Normal'].fontName = 'DejaVuSerif'
    styles['Heading1'].fontName = 'DejaVuSerif'

    pdfmetrics.registerFont(TTFont('DejaVuSerif', 'static/font/DejaVuSerif.ttf', 'UTF-8'))

    doc = SimpleDocTemplate(filename=fileName,
                            pagesize=A4,
                            title=title)

    story = []  # словарь документа

    # текст
    story.append(Paragraph(title, styles["Heading1"]))
    story.append(Paragraph('ООО "Название"', styles["Normal"]))
    story.append(Paragraph("ФИО: " + name + " Телефон: " + phone + " Почта: " + mail, styles["Normal"]))
    # таблица русская
    column_widths = [60, 150, 150, 40, 80]
    for item in items:
        item[1] = Paragraph(item[1], styles["Normal"])
        try:
            item[2] = Paragraph(item[1], styles["Normal"])
        except:
            item[2] = Paragraph("-", styles["Normal"])
            print("An exception occurred. Can't transfere disription to pdf. Id: " + str(item[0]))
        if (item[3] == None or item[3] == "-"):
            item[3] = Paragraph("-", styles["Normal"])
        if (item[4] == None or item[4] == "-"):
            item[4] = Paragraph("-", styles["Normal"])
    items.insert(0, ["id", Paragraph("Наименование", styles["Normal"]), Paragraph("Описание", styles["Normal"]),
                     Paragraph("Цена", styles["Normal"]), Paragraph("Доступное количество", styles["Normal"])])
    t = Table(
        items, colWidths=column_widths
    )
    t.setStyle(TableStyle([('ALIGN', (1, 1), (-2, -2), 'CENTER'),
                           ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),
                           ('BOX', (0, 0), (-1, -1), 0.25, colors.black),
                           ]))
    story.append(t)
    story.append(Paragraph('Итого: ' + str(count_items_price(items)), styles["Normal"]))
    doc.build(story)


def count_items_price(items):  # подсчёт цены всех товаров
    price = 0
    for item in items:
        if (len(item) == 5 and not isinstance(item[3], Paragraph) and not isinstance(item[4], Paragraph) and item[
            0] != "id"):
            price += item[3] * items[4]
    return price


def form_files_from_list(ids, fio, phone, email):  # Формирование КП на вход idишники -> на выход pdf'ка и csv
    items = []
    jsontext = load_json()
    for i in range(len(ids)):
        var = find_in_json(ids[i], jsontext)
        if var != None:
            toAppend = [var["id"], var["name"], var["description"], var["price"], var["quantity_in_stock"]]
            items.append(toAppend)
    itForCSV = items.copy()
    make_csv(fileName=fio + '.pdf', name=fio, phone=phone, mail=email, items=itForCSV)
    make_pdf(items=items, fileName=fio + '.pdf', name=fio, phone=phone, mail=email)


def find_in_json(findId,
                 jsonText=None):  # На вход: опционально json с продуктами и id для поиска -> на выход конкретный продукт из json'ая
    if (jsonText == None):
        jsonText = load_json()
    dic = json.loads(jsonText)
    products = dic["products"]
    for product in dic.get('products', []):
        if product['id'] == findId:
            return product
    return None


def find_in_json(findName, jsonText=None):
    if (jsonText == None):
        jsonText = load_json()
    dic = json.loads(jsonText)
    products = dic["products"]
    to_return = []
    for product in dic.get('products', []):
        if findName.lower() in product['name'].lower():
            to_return.append(product)
    return to_return


def load_json():  # достаём json из файла
    file_path = "apiresp.json"
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.read().rstrip()
    jsonText = data
    jsonText = jsonText.replace("\n", "")
    return jsonText


if __name__ == "__main__":
    form_files_from_list([115900610, 109158468])  # test code. #delete before production
