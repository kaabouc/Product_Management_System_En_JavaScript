//get total 


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood='create';
let tmp ; 
let searchMode='title'

function getTotal(){
    if ( price.value != ''){
        let result = ( +price.value + +taxes.value+ +ads.value ) - +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor='green';
    }
    else{
        total.innerHTML='';
    }
}

// create 

let dataPro;
if(localStorage.product != null){
     dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [] ;
}


submit.onclick = function(){
    let newPro = {
        title :title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value.toLowerCase(),

    }
  if(mood === 'create'){
    if(newPro.count>1){
        for(i=0;i<newPro.count ; i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro); 
    }
  }
  else{
    dataPro[i]=newPro;
    mood ='create';
    submit.innerHTML='create';
    count.style.display='block';
  }
   
    localStorage.setItem('product' ,  JSON.stringify(dataPro)  )
    console.log(dataPro);
    clairdata()
    Showdata()
}


//clear

function clairdata(){
    title.value='';
    total.innerHTML='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    category.value='';
    count.value='';
}



//READ  en local storage 

function Showdata(){
    let table='';
     for(i=0 ; i<dataPro.length ;i++){
        table += `
        <tr>
        <td>${i}</th>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].cout}</td>
        <td>${dataPro[i].category}</td>
        <td > <button onclick="updatedata(${i})" id="update">update<button> </td>
        <td > <button onclick="deletedata(${i})" id="delete">delete<button> </td>
      </tr>
        `
     }

    document.getElementById('tbody').innerHTML=table ; 
    
    let btndeleteall = document.getElementById('deleteall');
    if(dataPro.length > 0 ){
        btndeleteall.innerHTML =`
       <button onclick="deletealldata()" id="deleteall">delete all ( ${dataPro.length} ) <button>
        `
    }
    getTotal()

}


// delete 

function deletedata(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    Showdata();
}
//delete all 

function deletealldata(){
    localStorage.clear() ; 
    dataPro.splice(0)
    Showdata();

}

// update

function updatedata(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    category.value=dataPro[i].category;

    getTotal()
    count.style.display='none';
    submit.innerHTML='update';
    mood='update';
    tmp = i ;
    scroll({
        top:0
    })
}
 

// search 

function getSearchMod(id){
    let search= document.getElementById('search');

     if( id == 'searchtitle'){
        searchMode = 'title';
        search.placeholder='search by title .. ';



     }else{
        searchMode= 'category';
        search.placeholder='search by category .. ';

     }
     search.focus()
     search.value=''
     Showdata();
     
}
function searchdata(value){
    let table ='' ;
    if( searchMode == 'title'){

        for(i=0 ; i<dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</th>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].cout}</td>
                <td>${dataPro[i].category}</td>
                <td > <button onclick="updatedata(${i})" id="update">update<button> </td>
                <td > <button onclick="deletedata(${i})" id="delete">delete<button> </td>
              </tr>
                `

            }
        }

    }else{
        for(i=0 ; i<dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</th>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].cout}</td>
                <td>${dataPro[i].category}</td>
                <td > <button onclick="updatedata(${i})" id="update">update<button> </td>
                <td > <button onclick="deletedata(${i})" id="delete">delete<button> </td>
              </tr>
                `

            }
        }



    }
    document.getElementById('tbody').innerHTML=table ; 
}