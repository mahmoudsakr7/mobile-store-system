//declare variables
//1- all the inputs 
let TitleTxt = document.getElementById('title-txt');
let PriceTxt = document.getElementById('price-txt');
let TaxesTxt = document.getElementById('taxes-txt');
let AdsTxt = document.getElementById('ads-txt');
let DiscounTxt = document.getElementById('discoun-txt');
let TotalPrice = document.getElementById('total-price');
let CountTxt = document.getElementById('count-txt');
let CategoryTxt = document.getElementById('category-txt');
let SearchTxt = document.getElementById('search-txt');

//2- all the buttons 
let CreateBtn = document.getElementById('create-btn');
let SearchByTitleBtn = document.getElementById('search-by-title-btn');
let SearchByCategoryBtn = document.getElementById('search-by-category-btn');
let DeleteAllBtn = document.getElementById('delete-all-btn');

//3- putting all the inputs in an array incase of reset
let InputsArray = [TitleTxt, PriceTxt, TaxesTxt, AdsTxt, DiscounTxt, CountTxt, CategoryTxt];

//
function DataValidation() {
    for (let i = 0; i < InputsArray.length; i++) {
        if (InputsArray[i].value == '') {
            InputsArray[i].style.border = "1px solid red";
            InputsArray[i].style.outline = "1px solid red";
        }
    }
}

function ResetInputStyle() {
    for (let i = 0; i < InputsArray.length; i++) {
        if (InputsArray[i].value != '') {
            InputsArray[i].style.border = "1px solid #d6d6d6";
            InputsArray[i].style.outline = "1px solid #d6d6d6";
        }
    }
}
//function to clear all the inputs after creating a product 
function ClearInputs() {
    TitleTxt.value = "";
    PriceTxt.value = "";
    TaxesTxt.value = "";
    AdsTxt.value = "";
    DiscounTxt.value = "";
    TotalPrice.innerHTML = "Total:";
    TotalPrice.style.backgroundColor = "red";
    CountTxt.value = "";
    CountTxt.style.display = "block";
    CategoryTxt.value = "";
    CreateBtn.innerHTML = "Create";
}

//function to calulate the total price ( price + taxes + ads - discount )
function GetTotalPrice() {
    if (PriceTxt.value != "") {
        let total = (+PriceTxt.value + +TaxesTxt.value + +AdsTxt.value - +DiscounTxt.value);
        TotalPrice.innerHTML = "Total:" + total;
        TotalPrice.style.backgroundColor = "green";
    }
    else {
        TotalPrice.innerHTML = "Total:";
        TotalPrice.style.backgroundColor = "red";
    }
}

//Establishing the local storage to store products in it 
let ProductData = [];
if (localStorage.product != null) {
    ProductData = JSON.parse(localStorage.product);
}

//function to create a product and store it in the local storage
let mood = 'create';
let temp
function CreateProduct() {
    if (TitleTxt.value != "" && PriceTxt.value != "" && CategoryTxt.value != "") {
        //pushing the product to the array
        if (mood === 'create') {
            //putting all the product's data in an  one object
            let product = {
                title: TitleTxt.value,
                price: PriceTxt.value,
                taxes: TaxesTxt.value,
                ads: AdsTxt.value,
                discount: DiscounTxt.value,
                total: TotalPrice.innerHTML,
                category: CategoryTxt.value,
            }
            if (+CountTxt.value >= 1) {
                for (let i = 0; i < +CountTxt.value; i++) {
                    ProductData.push(product);
                }
                //then store it in the local storage after converting it to string
                localStorage.setItem("product", JSON.stringify(ProductData));
                //after that used showdata function to show the data
                ShowData();
            } else if (CountTxt === 1) {
                ProductData.push(product);
                //then store it in the local storage after converting it to string
                localStorage.setItem("product", JSON.stringify(ProductData));
                //after that used showdata function to show the data
                ShowData();
            }
        } else if (mood == "update") {
            let product = {
                title: TitleTxt.value,
                price: PriceTxt.value,
                taxes: TaxesTxt.value,
                ads: AdsTxt.value,
                discount: DiscounTxt.value,
                total: TotalPrice.innerHTML,
                category: CategoryTxt.value,
            }
            ProductData[temp] = product;
            localStorage.product = JSON.stringify(ProductData);
            ShowData();
        }
        mood = 'create';
        ClearInputs();
    }
    else {
        DataValidation();
    }
}
ShowData();

//function used to show data in a table
function ShowData() {
    let table = '';
    for (let i = 0; i < ProductData.length; i++) {
        table += `
        <tr>
            <th>${i + 1}</th>
            <th>${ProductData[i].title}</th>
            <th>${ProductData[i].price}</th>
            <th>${ProductData[i].taxes}</th>
            <th>${ProductData[i].ads}</th>
            <th>${ProductData[i].discount}</th>
            <th>${ProductData[i].total}</th>
            <th>${ProductData[i].category}</th>
            <th><button id="update" onclick="UpdateProduct(${i})">update</button></th>
            <th><button id="delete" onclick="DeleteProduct(${i})">delete</button></th>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table
}

//function used to delete product from the table
function DeleteProduct(i) {
    ProductData.splice(i, 1);
    localStorage.product = JSON.stringify(ProductData);
    ShowData();
}

//function used to delete all the products
function DeleteAllProducts() {
    localStorage.clear();
    ProductData.splice(0);
    ShowData();
}

//function used to search for a product by title
function SearchProductByTitle() {
    let table = '';
    if (SearchTxt.value != null) {
        for (let i = 0; i < ProductData.length; i++) {
            if (ProductData[i].title.toLowerCase().includes(SearchTxt.value.toLowerCase())) {
                table +=
                    ` <tr>
                        <th>${i + 1}</th>
                        <th>${ProductData[i].title}</th>
                        <th>${ProductData[i].price}</th>
                        <th>${ProductData[i].taxes}</th>
                        <th>${ProductData[i].ads}</th>
                        <th>${ProductData[i].discount}</th>
                        <th>${ProductData[i].total}</th>
                        <th>${ProductData[i].category}</th>
                        <th><button id="update" onclick="UpdateProduct(${i})">update</button></th>
                        <th><button id="delete" onclick="DeleteProduct(${i})">delete</button></th>
                    </tr>`
            }
            document.getElementById('tbody').innerHTML = table
        }
    }
}

//function used to search for a product by category
function SearchProductByCategory() {
    let table = '';
    if (SearchTxt.value != null) {
        for (let i = 0; i < ProductData.length; i++) {
            if (ProductData[i].category.toLowerCase().includes(SearchTxt.value.toLowerCase())) {
                table +=
                    ` <tr>
                        <th>${i + 1}</th>
                        <th>${ProductData[i].title}</th>
                        <th>${ProductData[i].price}</th>
                        <th>${ProductData[i].taxes}</th>
                        <th>${ProductData[i].ads}</th>
                        <th>${ProductData[i].discount}</th>
                        <th>${ProductData[i].total}</th>
                        <th>${ProductData[i].category}</th>
                        <th><button id="update" onclick="UpdateProduct(${i})">update</button></th>
                        <th><button id="delete" onclick="DeleteProduct(${i})">delete</button></th>
                    </tr>`
            }
            document.getElementById('tbody').innerHTML = table
        }
    }
}

//function used to update product
function UpdateProduct(i) {
    TitleTxt.value = ProductData[i].title;
    PriceTxt.value = ProductData[i].price;
    TaxesTxt.value = ProductData[i].taxes;
    AdsTxt.value = ProductData[i].ads;
    DiscounTxt.value = ProductData[i].discount;
    TotalPrice.innerHTML = ProductData[i].total;
    TotalPrice.style.backgroundColor = "green";
    CategoryTxt.value = ProductData[i].category;
    CountTxt.style.display = "none";
    CreateBtn.innerHTML = "Update";
    scrollTo(0, 0);
    mood = 'update';
    temp = i;
}


