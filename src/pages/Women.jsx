import { Box, Checkbox, Flex, Grid, GridItem, Image, Text,Button,Spinner } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/AppReducer/action";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Filter from "../components/Filter";
import { FilterSlider } from "../components/FilterSlider";

const Women = () => {
  const { data } = useSelector((store) => store.AppReducer);
  const [searchParams]= useSearchParams()
  const location= useLocation()



  const dispatch = useDispatch();
  let item= searchParams.getAll("item")
  let price= searchParams.getAll("price")
  // console.log(price)

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // console.log(windowDimensions)
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  useEffect(() => {
   
    if(item.length>0 || price.length>0){
      const queryParams={
        params:{
           category:['women'],
           item:item,
           price:price
        }
      }
      dispatch(getData(queryParams))
    }else{
      const queryParams={
        params:{
           category:['women'],
          
        }
      }
      dispatch(getData(queryParams));
    }
      
  }, [item.length,price.length,location]);
  // console.log(data);
  

  
  
  return (
    <Flex mt={windowDimensions.width>920 && "8rem"}>
      {data.length>0 ? <>
        <FilterSlider/>

      <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(4, 1fr)']} gap={['3rem','3rem','5rem']} m="2rem 2rem">
        {data?.map(el=>(
        
          <GridItem key={el._id} 
          // border={['1px solid black', '2px solid black', '3px solid black']}
          shadow={"rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px"}
           p={['0.25rem','0.5rem','1rem']}
           >
            <Image src={el.image_url} w={['60%','70%','80%']} m="auto"/>
            <Text as={"b"}>{el.item}</Text>
            {/* <Text color={"gray"}>{el.brand}</Text> */}
            <Text noOfLines={['2','1','1']}>{el.title}</Text>
            <Text color={"red.400"}>{el.price}</Text>
            <Link to={`/product/${el._id}`}><Button bg={"blue.600"} color={'white'}>Show more</Button></Link>
          </GridItem>
        ))}
      </Grid>
      </> : <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
  m="auto"
/>}
     
    </Flex>
  );
};

export default Women;
