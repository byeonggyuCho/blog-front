import {createAction} from 'typesafe-actions'

export const SHOW_MENUE = 'base/SHOW_MENUE' as const;
// const HIDE_MENUE = 'base/HIDE_MENUE' as const;


export const showMenu = createAction(SHOW_MENUE,
    (v:boolean)=>v
)()


const actions = {
    showMenu
}
  
export default actions;