import React, { useRef } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Menu from "react-native-material-menu";
import { styles } from "../Styles";

interface Props {
  children: any;
  list: Array<any>;
  onPress: Function;
}

const PickerAtom = (props: Props) => {
    let menu = useRef({ show: ()=>{}, hide: ()=>{} });
    const setMenuRef = (ref: any) => menu.current = ref;
    const hideMenu = (value: any) => {
        props.onPress(value);
        menu.current.hide();
    }
    const showMenu = () => menu.current.show();
    return (
        <Menu ref={setMenuRef} button={<TouchableOpacity onPress={showMenu}>{props.children}</TouchableOpacity>}>
            {
                (props.list) && props.list.map((value, key)=>(
                    <TouchableOpacity 
                    key={key} 
                    style={value.display ? [styles.dropDownItemView, { height: 44, minWidth: 250, maxWidth: 300 }] 
                    : [styles.dropDownItemView, { width: 180 }]} 
                    onPress={()=>hideMenu(value)}>
                        <Text style={value.display ? [styles.dropDownText, { fontSize: 14 }] 
                        : styles.dropDownText}>{(value && value.display) ? value.display : value}</Text>
                    </TouchableOpacity>
                ))
            }
        </Menu>
    );
};

export default PickerAtom;