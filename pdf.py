#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import csv
import json
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Frame
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


#email: 40 symbols max!
def form_pdf(file_name, name="Egor Glebov", phone="+79822802730", email="a@aaвввввввввddввввввввввввввввdвввa.com", co_number="316", data = [
    ['1', 'Лоток перфорированный 100х80 L2000, горячеоцинкованный', '35312HDZ', '8 087,00 KZT', 'Метр', '48', '388 176,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
    ['2', 'Крышка на лоток с заземлением осн.100 L2000, горячеоцинкованная', '35512HDZ', '4 069,00 KZT', 'Метр', '48', '195 312,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
    ]):
    data.insert(0, ['№', 'Наименование', 'Производитель\nили\nАртикул', 'Цена\nс учетом НДС', 'Ед.\nизм', 'К-во', 'Сумма\nс\nучетом НДС', 'Кратность\nупаковки', 'Наличие', 'Срок\nпоставки'])
    file_name = file_name.replace(" ","").replace(".","")
    # Create a PDF file
    output_file = f'{file_name}.pdf'
    c = canvas.Canvas(output_file, pagesize=A4)
    pdfmetrics.registerFont(TTFont('DejaVuSans', 'static/font/DejaVuSerif.ttf'))
    c.setFont('DejaVuSans', 5)
    styles = getSampleStyleSheet()
    centered_style = ParagraphStyle(
        name='Centered',
        parent=styles['Normal'],
        fontName='DejaVuSans',
        fontSize=5,
        alignment=1,  # Center alignment (TA_CENTER)
        spaceAfter=12
    )
    left_style = ParagraphStyle(
        name='Centered',
        parent=styles['Normal'],
        fontName='DejaVuSans',
        fontSize=5,
        alignment=0,  # Center alignment (TA_CENTER)
        spaceAfter=12
    )
    big_bold_style = ParagraphStyle(
        name='Centered',
        parent=styles['Normal'],
        fontName='DejaVuSans',
        fontSize=12,
        alignment=1,  # Center alignment (TA_CENTER)
        spaceAfter=12
    )
    left_hren = """ТОО «АСБ-ТОП» Республика Казахстан,
        010000 г. Астана, Алматинский район,
        ул. Жанкент, д 155, офис 6.<br/>
        Тел: +7 777 5336031<br/>РНН 620200517080
        Р/сч KZ71998BTB0000323564 KZT;<br/>
        БИК TSESKZKA ; БИН 160540005119<br/>
        АО "Jýsan Bank"
        """
    paragraph = Paragraph(left_hren, centered_style)
    # Create a Frame to hold the paragraph (fixed-size box)
    frame_width = 125
    frame_height = 108
    frame_x = (50)
    frame_y = (700)  # Center vertically

    frame = Frame(frame_x, frame_y, frame_width, frame_height)

    # Add the paragraph to the frame
    frame.addFromList([paragraph], c)
    right_input = f"""Кому:{name}<br/> Тел:{phone}<br/>Почта:{email}<br/>КП-№{co_number}"""
    paragraph2 = Paragraph(right_input, centered_style)

    # Create a Frame to hold the paragraph (fixed-size box)
    frame_width = 200
    frame_height = 108
    frame_x = (400)
    frame_y = (675)  # Center vertically

    frame = Frame(frame_x, frame_y, frame_width, frame_height)
    frame.addFromList([paragraph2], c)
    company_name = Paragraph(f"""<b>ТОО "АСБ-ТОП"</b><br/><b>Коммерческое предложение</b><br/>от {datetime.date(datetime.now())} """, big_bold_style)
    # Create a Frame to hold the paragraph (fixed-size box)
    frame_width = 200
    frame_height = 55
    frame_x = (A4[0]-frame_width)/2
    frame_y = (750)  # Center vertically

    frame = Frame(frame_x, frame_y, frame_width, frame_height, showBoundary=1)
    
    # Add the paragraph to the frame
    frame.addFromList([company_name], c)
    column_widths = [15, 120, 90, 60, 30, 25, 50, 60,50,60]
    for i in range(len(data)):
        for j in range(len(data[i])):
            if(len(str(data[i][j])) > 11):
                data[i][j] = str(data[i][j]).replace(" ","\n")
                # print("lol")
                # # 176,00 KZT
    # Define the table style
    table_style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, -1), 'DejaVuSans'),
        ('FONTSIZE', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('rowHeights',(0,0),(-1,-1),None)
    ])
    # frame.addFromList([table],c)
    width = 10
    height = 40
    x = 10
    y = 695
    f = Table(data, style=table_style, colWidths=column_widths)
    width,height = f.wrapOn(c, width, height)
    # f.wrap(width, height)
    theight = height
    ty = y
    if (y-height<100):
        print("An error occured! There is no space on this sheet for your shit")
        return
    f.drawOn(c, x, y-height)
    footer_left = """
    Условия оплаты: 100% Предоплата<br/>
Условие поставки: DDP г.Астана.<br/>
Срок действия предложения: 5-7 календарных дней.<br/>
Срок поставки оборудования: исчисляется с момента поступление предоплаты<br/>
Контактное лицо поставщика: Калмаханов А.Г.<br/>
E-mail: asb-top@mail.ru<br/>
Моб: +7 708 425 62 82<br/>
Тел: +7 7172 25-62-82<br/>
Е. www.asb-top.kz<br/>
С уважением,<br/>
Калмаханов А.Г.
    """
    paragraph = Paragraph(footer_left, left_style)
    # Create a Frame to hold the paragraph (fixed-size box)
    frame_width = 200
    frame_height = 160
    frame_x = (30)
    frame_y = y-height-frame_height - 60  # Center vertically
    frame = Frame(frame_x, frame_y, frame_width, frame_height)

    # Add the paragraph to the frame
    frame.addFromList([paragraph], c)
    total = f"""ВСЕГО СТОИМОСТЬ ОБОРУДОВАНИЯ С УЧЕТОМ НДС: {count_items_price(data)}"""
    paragraph = Paragraph(total, big_bold_style)
    # Create a Frame to hold the paragraph (fixed-size box)
    frame_width = 500
    frame_height = 50
    frame_x = (A4[0]-frame_width)/2
    frame_y = y-height-frame_height - 10  # Center vertically
    frame = Frame(frame_x, frame_y, frame_width, frame_height, showBoundary=1)

    # Add the paragraph to the frame
    frame.addFromList([paragraph], c)
    c.save()

def form_csv(file_name, name="Egor Glebov", phone="+79822802730", email="a@aaвввввввввddввввввввввввввввdвввa.com", co_number="316", data = [
    ['1', 'Лоток перфорированный 100х80 L2000, горячеоцинкованный', '35312HDZ', '8 087,00 KZT', 'Метр', '48', '388 176,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
    ['2', 'Крышка на лоток с заземлением осн.100 L2000, горячеоцинкованная', '35512HDZ', '4 069,00 KZT', 'Метр', '48', '195 312,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
    ]):
    data.insert(0, [co_number, "ФИО:", name, "Телефон:", phone, "Почта:", email])
    file_name += '.csv'
    try:
        with open(file_name, 'w') as f:
            writer = csv.writer(f)
            for row in data:
                writer.writerow(row)
            print(file_name)
    except:
        print("Probably your file is opened. Please close it and try one more time")
    return

# function to count cost of all items
def count_items_price(items):  # подсчёт цены всех товаров
    price = 0
    for item in items:
        if item[0]!="№":
            price += int(item[6])
    return price


# function that combines formin pdf and csv, also prepare data for them
def form_files_from_list(products, fio, phone, email, coef):  # Формирование КП на вход idишники -> на выход pdf'ка и csv
    items = []
    # jsontext = load_json()
    for i in range(len(products)):
        toAppend = [i+1, products[i]["name"].replace("Name: ",""), products[i]["id"].replace("ID: ", ""), int(products[i]["price"].split(" ")[1])*int(coef), 'шт',products[i]["amount"], int(products[i]["price"].split(" ")[1])*coef*int(products[i]["amount"]), "64", products[i]["quantity"].split(" ")[3], "когда-то"]
        items.append(toAppend)
    itForCSV = items.copy()
    form_pdf(f"КП{fio+str(datetime.now().date())}",name=fio,phone=phone,email=email,data=items)
    form_csv(f"КП{fio+str(datetime.now().date())}",name=fio,phone=phone,email=email,data=items)
    # make_pdf(items=items, fileName=fio + '.pdf', name=fio, phone=phone, mail=email)


# function to find item in json by id
def find_in_json_by_id(findId,
                 jsonText=None):  # На вход: опционально json с продуктами и id для поиска -> на выход конкретный продукт из json'ая
    if (jsonText == None):
        jsonText = load_json()
    dic = json.loads(jsonText)
    products = dic["products"]
    for product in dic.get('products', []):
        if product['id'] == findId:
            return product
    return None


# function to find item in json by it's name
def find_in_json(findName, jsonText=None):
    if (jsonText == None):
        jsonText = load_json()
    dic = json.loads(jsonText)
    products = dic["products"]
    to_return = []
    for product in dic.get('products', []):
        if str(findName).lower() in str(product['name']).lower():
            to_return.append(product)
    return to_return


# function to find item in lsit by it's name
def find_item(findName, arr):
    to_return = []
    for product in arr:
        if str(findName).lower() in str(product['name']).lower():
            to_return.append(product)
    return to_return


# function to load text from json file
def load_json():  # достаём json из файла
    file_path = "apiresp.json"
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.read().rstrip()
    jsonText = data
    jsonText = jsonText.replace("\n", "")
    return jsonText


# function to pars data from user. To put on satu.kz
def parsing_file(filename):
    # TODO make this function :)
    print("Asdsad")
    return


if __name__ == "__main__":
    #TODO rewrite
    # form_files_from_list([115900610, 109158468])  # test code. #delete before production
    # make_csv()
    data = [
    ['№', 'Наименование', 'Производитель\nили\nАртикул', 'Цена\nс учетом\nНДС', 'Ед.\nизм', 'К-во', 'Сумма\nс\nучетом\nНДС', 'Кратность\nупаковки', 'Наличие', 'Срок\nпоставки'],
    ['1', 'Лоток перфорированный 100х80 L2000, горячеоцинкованный', '35312HDZ', '8 087,00 KZT', 'Метр', '48', '388 176,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
    ['2', 'Крышка на лоток с заземлением осн.100 L2000, горячеоцинкованная', '35512HDZ', '4 069,00 KZT', 'Метр', '48', '195 312,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
        ['1', 'Лоток перфорированный 100х80 L2000, горячеоцинкованный', '35312HDZ', '8 087,00 KZT', 'Метр', '48', '388 176,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
    ['2', 'Крышка на лоток с заземлением осн.100 L2000, горячеоцинкованная', '35512HDZ', '4 069,00 KZT', 'Метр', '48', '195 312,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
        ['1', 'Лоток перфорированный 100х80 L2000, горячеоцинкованный', '35312HDZ', '8 087,00 KZT', 'Метр', '48', '388 176,00 KZT', '16', '#Н/Д', '10-15 раб дней'],
]
    form_pdf("CO", data=data)
