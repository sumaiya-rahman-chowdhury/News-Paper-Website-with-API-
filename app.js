const handleClick = async() =>{
   const tabContainer = document.getElementById('tab-container');
   const response =await fetch('https://openapi.programming-hero.com/api/news/categories')
   const datas = await response.json() ;
  const data = (datas.data.news_category).slice(0,6);
   // console.log(data)
   data.forEach((catagory)=>{
      const div = document.createElement('div');
      div.innerHTML = `
      <a  onclick="handleLoadNews('${catagory.category_id}')" class="tab">${catagory.category_name}</a> 
      `
      // console.log(catagory.category_id)
      tabContainer.appendChild(div);
   })
}
const handleLoadNews = async (id) =>{
   // console.log(id)
  const response = await fetch
  (`https://openapi.programming-hero.com/api/news/category/${id}`);
  const data = await response.json() ;
  console.log(data.data)
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = " "
  data.data?.forEach((news)=>{
   const div = document.createElement('div');
   div.innerHTML =`
   <div class="card card-compact w-96 mx-auto bg-base-100 shadow-xl">
   <figure><img src="${news?.image_url}" alt="Shoes" /></figure>
   <div class="card-body">
    <div class="flex items-center">
       <h2 class="text-[16px] font-bold">${news.title.slice(0,40)
       }</h2>
       <button class=" text-[10px] bg-pink-700 px-3 py-[1px] rounded text-white">${news?.rating?.badge}</button>
    </div>
     <p>${news.details.slice(0,100)}</p>
     <p>Total Views : ${news.total_view? news.total_view : "No Views"}</p>
     <div class="card-actions items-center">
       <div >
           <div class = "flex items-center gap-x-2">
           <img src="${news?.author?.img}" alt="" class="w-[70px] h-[70px] rounded-full">
         <div>
         <h4 class="font-bold">${news?.author?.name}</h4>
         <p>${news?.author?.published_date?news?.author?.published_date:"Today Date"}</p>
           </div>
         </div>
         
       </div>
       <button class="btn text-white  bg-pink-700">Details</button>
     </div>
   </div>
 </div>
   
   `
   cardContainer.appendChild(div);
  })
}
handleClick();
handleLoadNews("01");