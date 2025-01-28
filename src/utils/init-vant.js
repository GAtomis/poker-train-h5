import {Dialog,Icon,Form, Field, CellGroup,Button} from 'vant'

const components = [Dialog,Icon,Form, Field, CellGroup,Button]

export const setVant=(Vue)=>{
  components.forEach(component=>{
    Vue.use(component)
  })
}