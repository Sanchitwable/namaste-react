        
        import React, { useEffect, useState } from "react";
        import ReactDOM from "react-dom/client";
        import { useState } from "react";
        import{createBrowserRouter, RouterProvider} from "react-router-dom";
        import { useRouteError ,Outlet,Link} from "react-router-dom";
        const Header=()=>{
                return(
                        <div className="header">
                                <div className="logo">
                                        <img className="logo" alt ="logo" src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png"/>
                                </div>
                                <div className="nave-items"> 
                                <ul>
                                <li><Link to="/">home</Link></li>
                                <li><Link to="/about">about us</Link></li>
                                <li><Link to="/contact">contact us</Link></li>
                                </ul>
                                </div>
                        </div>
                )
        }


        const About=()=>{

          return (
            <h1>THIS IS ABOUT PAGE</h1>

          );
        }
        const Contact=()=>{

          return (
            <h1>THIS IS contact us PAGE</h1>

          );
        }
       

        const Error=()=>{

          const err=useRouteError();
          console.log(err);
          return (
            <div>
             
              <h1>{err.status }:{ err.statusText}</h1>
          
            </div>
            

          );
        }


        const Restaurantmenu=()=>{

          const [resinfo,setresinfo]= useState([])

          useEffect(()=> fetchdata() , [])
          const fetchdata= async ()=>{

            const data =await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.121663&lng=74.729929&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

            const json=await data.json();
           setresinfo(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle)
           
          }
          
          return(
            <div>


              {/* <h1>{name}</h1>
              <h1>{costForTwo}</h1>
              <h1>{cuisines}</h1> */}


            </div>
          )
        }
        const RestraurantCard=(props)=>
        {     const {resdata}=props;

                return(
                        <div className="res-card">
                       
                        <img className="res-img"
                         src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+resdata.info.cloudinaryImageId}
                        />
                        <h3>{resdata.info.name}</h3>
                        <h5>{resdata.info.costForTwo}</h5>
                        <h5>{resdata.info.cuisines.join(", ")}</h5>
                        <h5>{resdata.info.avgRating}</h5>

                        </div>
                )
        }

     
        const Body =()=>{
          const [restaurantlist, setrestaurantlist]=useState([]);
          const [searchtext,setsearchtext]=useState([])
          const[searchlist,setsearchlist]=useState([]);
          

          useEffect(()=> fetchdata() , [])

          

          const fetchdata= async ()=>{

            const data =await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.121663&lng=74.729929&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

            const json=await data.json();
           setrestaurantlist(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            setsearchlist(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            console.log(searchlist);
          }

          
                return(
                        <div>
                                <button className="top-res" 
                                onClick={
                                  ()=>{ const filterlist=restaurantlist.filter((X)=>(X.info.avgRating>4))
                                  
                                    setsearchlist(filterlist);
                                  }
                                  
                                }
                                >top rated restraurant
                                </button>

                                
                                <input className="search" type= "text" placeholder="enter restaurant name " value={searchtext} onChange={(e)=>{ setsearchtext(e.target.value)}} ></input>
                                <button className="search-btn" onClick={ ()=>{

                                  const list= restaurantlist.filter(
                                    (res)=>res.info.name.toLowerCase().includes(searchtext.toLowerCase())
                                  );
                                setsearchlist(list);

                                } } >search</button>
                                

                                <Link to="/restaurant/:resId"> <div className="res-cointainer" >
                                
                                {
                                   searchlist.map((r) =>(<RestraurantCard resdata={r}/>))
                                 }
                                 </div></Link>
                        </div>
                )

        }


      
       

        const Applayout=()=>{
                return(
                        <div className="app">

                                <Header/>
                                <Outlet/>
                                
                        </div>


                )
        }

        const approuter=createBrowserRouter([
          {
            path:"/",
            element:<Applayout/>,
            children:[

              {
                path:"/",
                element:<Body/>

              },
              {
                path:"/about",
                element:<About/>
              }, 
              {
                path:"/contact",
                element:<Contact/>
              },
              {
                path:"/restaurant/:resId",
                element:<Restaurantmenu/>
              }

            ],
            errorElement:<Error/>
          }
         
        ]);



        const root= ReactDOM.createRoot(document.getElementById("root"));
        root.render(<RouterProvider router={approuter}/>);  
        
