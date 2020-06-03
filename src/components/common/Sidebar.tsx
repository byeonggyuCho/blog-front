import React,{useEffect} from 'react'
import {  Menu,Segment, Sidebar } from 'semantic-ui-react'
import  './Sidebar.css'

interface SidevarProp {
    user: any
    visible: boolean
    logoutHandler:()=>void
    gotoLoginForm:()=>void
    gotohandler:(e, { name })=>void
    hideMenu: ()=>void
}

const SideBarComp:React.FC<SidevarProp> = ({children,user,visible,logoutHandler,gotoLoginForm,gotohandler,hideMenu}) => {


  // 56: 네비게이션
  let PushableStyle = {
    height: (document.documentElement.clientHeight - 56)+"px"
  }

  const sideMenu = [
    {label: "JavaScript", tagnName:"javascript"},
    {label: "React", tagnName:"react"},
    {label: "NodeJS", tagnName:"nodejs"},
    {label: "Typescript", tagnName:"typescript"},
    {label: "Html", tagnName:"html"},
    {label: "Css", tagnName:"css"},
  ]

  const list = sideMenu.map((menu, i) => {
    return (
    // <PersonInfo person={person} key={i}/>
    <Menu.Item as='a' name={menu.tagnName}  onClick={gotohandler}>{menu.label} </Menu.Item>
    );
  });

  

  return (
    <Sidebar.Pushable as={Segment.Group} raised className='custom'style={PushableStyle} >
        <Sidebar
          as={Menu}
          animation='overlay'
          direction='right'
          icon='labeled'
          inverted
          onHide={() => hideMenu()}
          vertical
          visible={visible}
          width='thin'
          className='custom'
        >
          {user
            ? <Menu.Item as='a' name='logout' onClick={logoutHandler}>LogOut</Menu.Item>
            : <Menu.Item as='a' name='login' onClick={gotoLoginForm}>LogIn</Menu.Item>
          }
          {list}
          {/* <Menu.Item as='a' name='javascript'  onClick={gotohandler}>JavaScript</Menu.Item>
          <Menu.Item as='a' name='react'  onClick={gotohandler}>React</Menu.Item>
          <Menu.Item as='a' name='nodejs'  onClick={gotohandler}>NodeJS</Menu.Item> */}
        </Sidebar>

        <Sidebar.Pusher dimmed={visible} className='custom'>
          {/* <Segment basic> */}
            {children}
          {/* </Segment> */}
        </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SideBarComp