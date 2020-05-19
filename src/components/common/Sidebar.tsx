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



  return (
    <Sidebar.Pushable as={Segment.Group} raised className='custom'>
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
          <Menu.Item as='a' name='javascript'  onClick={gotohandler}>JavaScript</Menu.Item>
          <Menu.Item as='a' name='react'  onClick={gotohandler}>React</Menu.Item>
          <Menu.Item as='a' name='nodejs'  onClick={gotohandler}>NodeJS</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={visible}>
          {/* <Segment basic> */}
            {children}
          {/* </Segment> */}
        </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SideBarComp