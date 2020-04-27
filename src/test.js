import React, { Component } from 'react';
import { AppRegistry,View,Text,
StyleSheet,FlatList,Image,StatusBar,Thumbnail,
TouchableOpacity,Button, RefreshControl } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class CreateScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#660033',
        
        
      
     
      
      },
      headerTitleStyle: { alignSelf: 'center',marginLeft:56, color:"#fff" },
      title: 'Inventory',
      
      headerLeft: (
        <View>

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{ marginLeft: 10, height: 25, width: 25 }}
            source={require('./images/menu.png')}
          
          />
           
          </TouchableOpacity>
         
        </View>
      ),
      
      
    });
   
    
    constructor(props) {
      super(props);
      this.state = {
     
        
        data:[],
       isloading: true,
       
       
        
       };
     
     }
    

  
     componentDidMount(){
      fetch('api')
      .then(response => response.json())
      .then((responseJson)=> {
        
        this.setState({
         loading: false,
         data: responseJson
        }, );
       
      })
      .catch(error=>console.log(error)) 
      }
      
      
     
    
      FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
           backgroundColor:"rgba(0,0,0,0.5)",
      }}
      />
      );
      }
      
    render(){
      const {navigate} = this.props.navigation;
        return(
    <View style={styles.container}>
        
     <FlatList
    data={this.state.data}
    keyExtractor = { (item) => item.Id.toString() }
    ItemSeparatorComponent={this.FlatListItemSeparator}
    renderItem={({item})=>
    
        <TouchableOpacity  
        
        >
          <View style={styles.productBox}>
         <Image style={{height:100, width:100, margin:5}} source={{uri:'http://' +item.Thumbnail }} />
         
         <View style= {{flex:1,flexDirection:'column'}} >
    
         <Text style={styles.proName}>Name:{item.Name}</Text> 
    <Text style={styles.proName}>LocationName{item.Location}</Text>
    
    
     </View>
     </View>
    </TouchableOpacity>
    
    

    
    
    
   
    
    }
   
     />
     
  </View>
  );
}}
const styles = StyleSheet.create({
	container:{
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  

	},
	pageName:{
		margin:100,fontWeight:'bold',
    color:'#000', textAlign:'center',
    lineHeight:12
	},
	productBox:{
	  flex:1,
    flexDirection:'row'
	},
	price:{
		padding:5, color:'orange',fontWeight:'bold',textAlign:'center'
	},
	proName:{
    color: '#000000',
    margin:-8,
    padding: 8,
    fontSize:16,
  },
 
 
})
