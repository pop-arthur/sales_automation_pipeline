## Sales Automation Pipeline

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Aim: we needed to create a pipeline for quick and seamless process of creation of commercial offers for the construction company "АСБ-ТОП".

As a result, we designed a WEB-platform for sales managers which allows to easily search, add, edit items, and form PDF and xlsm tables. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Flask][Flask]][Flask-url]
* [![Python][Python]][Python-url]
* [![ReportLab][ReportLab]][ReportLab-url]
* [![SQLAlchemy][SQLAlchemy]][SQLAlchemy-url]
* [![Jinja2][Jinja2]][Jinja2-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- DEPLOYMENT -->
## Deployment

### Stack
This project is based on python flask package and sqlite database.

### Requirements
To delpoy the project, firstly, install dependencies from requirements.txt

### Executing file
To start the program run the app.py file

### Dockerfile
You can use dockerfile for deployment
```Dockerfile
FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
WORKDIR /main
COPY . .
ENV FLASK_APP=app.py
EXPOSE 8000


RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You can find the demonstration video [here](https://drive.google.com/file/d/1zWk5EcEwzLUlXscTgDpiYzLoNnyNHgmE/view)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Q1. Goal: Defining the main idea and create a layout for the customer
    - [ ] First customer meeting, discussion of the ideas
    - [ ] Creating Figma layout
    - [ ] HTML/CSS design
- [ ] Q2. Goal: Earliest Testable Product
    - [ ] Provide a website with the first implemented functionality
    - [ ] Improve the formation of the CO
    - [ ] Adding functionality according to customers' requests
- [ ] Q3. Goal: Earliest Usable Product
    - [ ] Test the work in real conditions
    - [ ] Adding functionality according to customers' requests
- [ ] Q4. Earliest Lovable Product
    - [ ] Coordination with the customer on final minor fixes
    - [ ] Getting customer approval

See the [open issues](https://gitlab.pg.innopolis.university/swp/test/-/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- API Description -->
## API Description
### `/get_cart` (GET)
- **Purpose**: Retrieves the current shopping cart for the authenticated user.
- **Method**: GET
- **Authentication Required**: Yes (`@login_required`)
- **Response**:
  - On success, returns the JSON representation of the user's current shopping cart.
  - If the cart is empty, returns an object with an empty `products` array.
- **Error Handling**:
  - No explicit error handling is shown, but standard Flask practices should be applied.

### `/post_cart` (POST)
- **Purpose**: Updates the authenticated user's shopping cart with new product information.
- **Method**: POST
- **Authentication Required**: Yes (`@login_required`)
- **Request Body**:
  - Expected to contain a JSON object with a `products` field representing the updated cart contents.
- **Response**:
  - Returns the updated cart as JSON with a 201 status code indicating successful creation.
- **Error Handling**:
  - Aborts with a 400 status code if the request does not contain valid JSON.

### `/save_cart_to_history` (POST)
- **Purpose**: Saves the current state of the authenticated user's shopping cart to history.
- **Method**: POST
- **Authentication Required**: Yes (`@login_required`)
- **Request Body**:
  - Expected to contain a JSON object with a `products` field representing the cart contents to be saved.
- **Response**:
  - Redirects to a template named "cart.html" with a variable `all_items` presumably populated with products.
- **Error Handling**:
  - Aborts with a 400 status code if the request does not contain valid JSON.

### `/get_cart_history` (GET)
- **Purpose**: Retrieves the history of shopping carts for the authenticated user.
- **Method**: GET
- **Authentication Required**: Yes (`@login_required`)
- **Response**:
  - Returns a JSON array of cart histories, each represented as a JSON object.
- **Error Handling**:
  - No explicit error handling is shown, but standard Flask practices should be applied.



<!-- CONTACT -->
## Contact

* Arthur Popov - [@ee_boooy](https://t.me/ee_boooy) - ar.popov@innopolis.university
* Egor Glebov - [@i_geeg_i](https://t.me/i_geeg_i) - e.glebov@innopolis.university
* Sofia Pushkareva - [@mcpushka](https://t.me/mcpushka) - s.pushkareva@innopolis.university
* Ivan Murzin - [@alliumpro](https://t.me/alliumpro) - i.murzin@innopolis.university
* Kirill Nosov - [@nodoser](https://t.me/nodoser) - k.nosov@innopolis.university

Project Link: [https://gitlab.pg.innopolis.university/swp/test/](https://gitlab.pg.innopolis.university/swp/test/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png

[Flask]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/

[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://www.python.org/

[ReportLab]: https://prnt.sc/cf6aSF-rVPWh/
[ReportLab-url]: https://docs.reportlab.com/

[SQLAlchemy]: -
[SQLAlchemy-url]: https://www.sqlalchemy.org/

[Jinja2]: https://img.shields.io/badge/jinja-white.svg?style=for-the-badge&logo=jinja&logoColor=black
[Jinja2-url]: https://jinja.palletsprojects.com/en/2.10.x/intro/

