import {
  Box,
  Flex,
  Input,
  Text,
  Image,
  Button,
  Avatar,
  AvatarBadge,
  WrapItem,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { GiEternalLove } from "react-icons/gi";
import { BsBagCheck } from "react-icons/bs";
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
// import { Image } from "react-bootstrap";
import { IconContext } from "react-icons";
import styles from "./Navbar.model.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Redux/AuthReducer/action.type";
import Mobileview from "./Mobileview";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState([]);
  const { isAuth } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  // console.log(isAuth)
  const navigate = useNavigate();

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log(windowDimensions)
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const handleParams = (value) => {
    navigate(`/${value}`);
  };

  const handleLogout = async () => {
    await localStorage.removeItem("token");
    await dispatch({ type: LOGOUT });

    navigate("/login");
  };
  // useEffect(()=>{
  //   console.log("amit")
  // },[])
  console.log(isHovering);
  return (
    <>
      {" "}
      {windowDimensions.width > 920 ? (
        <Flex
          bg={"white"}
          // border="1px solid red"
          // p="0.5rem"
          justify={"space-between"}
          alignItems="center"
          boxSizing={"border-box"}
          shadow={
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
          }
          position="fixed"
          top="0"
          w="100%"
          zIndex={"1"}
        >
          <Flex
            p={"0.5rem"}
            justifyContent={"space-around"}
            align="center"
            gap="0.5rem"
            w="40%"
          >
            {/* border="1px solid black" */}
            <NavLink to="/">
              <Box>
                <Image
                  src="https://www.freelogovectors.net/wp-content/uploads/2021/02/myntra-logo-freelogovectors.net_.png"
                  boxSize={"2rem"}
                />
              </Box>
            </NavLink>
            <Text
              as="b"
              fontSize={["sm", "md", "lg", "xl"]}
              cursor={"pointer"}
              onClick={() => handleParams("men")}
            >
              Men
            </Text>
            <Text
              as="b"
              fontSize={["sm", "md", "lg", "xl"]}
              cursor={"pointer"}
              onClick={() => handleParams("women")}
            >
              Women
            </Text>
            <Text
              as="b"
              fontSize={["sm", "md", "lg", "xl"]}
              cursor={"pointer"}
              onClick={() => handleParams("kids")}
            >
              Kid
            </Text>
          </Flex>

{/* <Box> */}

          <Input placeholder="Search here" w={"30%"} />
{/* </Box> */}

          <Flex
            m="1rem"
            boxSizing="border-box"
            w={"30%"}
            mr="5rem"
            alignItems={"center"}
            justify="flex-end"
            p={"0.5rem"}
            gap="2rem"
            // border={"1px solid red"}
          >
           

            <Box>
              <IconContext.Provider value={{ size: "2em" }}>
                <div style={{ color: "red" }}>
                  <GiEternalLove cursor={"pointer"} />
                </div>
              </IconContext.Provider>
              <Text>Wishlist</Text>
            </Box>

            <Box>
              {/* <BsBagCheck className={styles.logo} /> */}
              <IconContext.Provider value={{ size: "2em" }}>
                <div>
                  <BsBagCheck
                    style={{ color: "blueviolet" }}
                    cursor={"pointer"}
                    onClick={() => {
                      isAuth ? navigate("/cart") : alert("Please login first");
                    }}
                  />
                </div>
              </IconContext.Provider>
              <Text>Bag</Text>
            </Box>

            <Box>
              <IconContext.Provider value={{ size: "2em" }}>
                {/* <div> */}
                  {!isAuth && (
                    <CgProfile
                      cursor={"pointer"}
                      onClick={() => navigate("/login")}
                    />
                  )}
                {/* </div> */}
              </IconContext.Provider>

              {isAuth ? (
                <WrapItem>
                  <Tooltip label="LOGOUT">
                    <Avatar cursor={"pointer"} onClick={handleLogout}>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  </Tooltip>
                </WrapItem>
              ) : (
                <Text>Profile</Text>
              )}
            </Box>


          </Flex>
        </Flex>
      ) : (
        <Mobileview />
      )}
    </>
  );
};

export default Navbar;
