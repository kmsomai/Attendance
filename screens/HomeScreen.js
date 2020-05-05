
import React, {useState,useEffect,Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppHeader from '../components/AppHeader';
import {db} from '../config';

export default function HomeScreen () {
  const [presentList,setpresentList]=useState([]);
  const [absentList,setabsentList]=useState([]);
  const [studentsA,setstudentsA]=useState([]);
  
  function updateAttendence(rollno, status){
    var id = '';
    if (rollno <= 5) {
      id = '0' + rollno;
    } else {
      id = rollno;
    }
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {dd = '0' + dd;}
  if (mm < 10) {mm = '0' + mm;}
  today = dd + '-' + mm + '-' + yyyy;
  var ref_path = 'class_A/' + id;
  var class_ref = db.ref(ref_path);
  class_ref.update({[today]: status,})
  };
    
  useEffect(async() => {
    var class_ref =db.ref('/').on('value', data => {
      var gradeA = data.val().class_A;
      for (var i in gradeA) {
        studentsA.push(gradeA[i]);
      }
      studentsA.sort(function(a, b) {
        return a.rollno - b.rollno;
      });
      setstudentsA(studentsA,studentsA);
    })},studentsA
  );
  
  return(
    <View style={styles.container}>
      <View style={{flex:0.1}}>
        <AppHeader/>
      </View>
      <View style={{ flex: 0.8 }}>
        {studentsA.map((student, index) => (
          <View key={index} style={styles.studentChartContainer}> 
            <View 
              key={'name' + index}
              style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, marginRight: 50 }}>
                {student.rollno}
              </Text>
              <Text style={{fontSize: 20 }}>
                {student.name}
              </Text>
            </View> 
            <View style={{flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity
                style={
                  presentList.includes(index)
                  ? [styles.presentButton, {backgroundColor: 'green'}]
                  : styles.presentButton
                }
                onPress={() => {
                  presentList.push(index);
                  setpresentList();
                  var rollno = index + 1;
                  updateAttendence(rollno, 'present');
                }}>
                <Text>P</Text>
              </TouchableOpacity> 
              <TouchableOpacity
                style={
                  absentList.includes(index)
                  ? [styles.absentButton, { backgroundColor: 'red' }]
                  : styles.absentButton
                }
                onPress={() => {
                  absentList.push(index);
                  setabsentList();
                  var rollno = index + 1;
                  updateAttendence(rollno, 'absent');
                }}>
                <Text>A</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={{ flex: 0.1 }}>
        <TouchableOpacity
          style={styles.footer}
          onPress={() => {
          navigation.navigate('Submit');
          }}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};
//********************************************* */
//The Below Given CODING works , 
//COMMENT OUT THE ABOVE FOR TESTING THIS 

//********************************************* */

// import React, {useState,useEffect,Component} from 'react';
// import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import AppHeader from '../components/AppHeader';
// import {db} from '../config';

// export default class HomeScreen extends Component {
//   constructor() {
//     super();
//     this.state = {
//       studentsA: [],
//       presentList: [],
//       absentList: [],
//     };
//   }

//   componentDidMount = async() => {
//     var class_ref =db.ref('/').on('value', data => {
//       var studentsA =  []
//       var gradeA = data.val().class_A;
//       for (var i in gradeA) {
//         studentsA.push(gradeA[i]);
//       }
//       studentsA.sort(function(a, b) {
//         return a.roll_no - b.roll_no;
//       });
//       this.setState({ studentsA: studentsA });
//     });
//   };

//   updateAttendence(roll_no, status) {
//     var id = '';
//     if (roll_no <= 5) {
//       id = '0' + roll_no;
//     } else {
//       id = roll_no;
//     }
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();
//     if (dd < 10) {
//       dd = '0' + dd;
//     }
//     if (mm < 10) {
//       mm = '0' + mm;
//     }
//     today = dd + '-' + mm + '-' + yyyy;
//     var ref_path = 'class_A/' + id;
//     var class_ref = db.ref(ref_path);
//     class_ref.update({
//       [today]: status,
//     });
//   }

//   render() {
//     var studentsA = this.state.studentsA;
//     if (studentsA.length === 0) {
//       return (
//         <View
//           style={{ flex:1,justifyContent:'center',alignItems:'center'}}>
//           <Text>Loading.....</Text>
//           <ActivityIndicator size='large' />
//         </View>
//       );
//     } else {
//       return (
//         <View style={styles.container}>
//           <View style={{ flex: 0.1 }}>
//             <AppHeader/>
//           </View>
//           <View style={{ flex: 0.8 }}>
//             {studentsA.map((student, index) => (
//               <View key={index} style={styles.studentChartContainer}>
//                 <View
//                   key={'name' + index}
//                   style={{ flex: 1, flexDirection: 'row' }}>
//                   <Text style={{ fontSize: 20, marginRight: 50 }}>
//                     {student.rollno}
//                   </Text>
//                   <Text style={{ fontSize: 20 }}>
//                     {student.name}
//                   </Text>
//                 </View>
//                 <View style={{ flex: 1, flexDirection: 'row' }}>
//                   <TouchableOpacity
//                     style={
//                       this.state.presentList.includes(index)
//                         ? [styles.presentButton, { backgroundColor: 'green' }]
//                         : styles.presentButton
//                     }
//                     onPress={() => {
//                       var presentList = this.state.presentList;
//                       presentList.push(index);
//                       this.setState({ presentList: presentList });
//                       var roll_no = index + 1;
//                       this.updateAttendence(roll_no, 'present');
//                     }}>
//                     <Text>P</Text>
//                   </TouchableOpacity> 
//                   <TouchableOpacity
//                     style={
//                       this.state.absentList.includes(index)
//                         ? [styles.absentButton, { backgroundColor: 'red' }]
//                         : styles.absentButton
//                     }
//                     onPress={() => {
//                       var absentList = this.state.absentList;
//                       absentList.push(index);
//                       this.setState({ absentList: absentList });
//                       var roll_no = index + 1;
//                       this.updateAttendence(roll_no, 'absent');
//                     }}>
//                     <Text>A</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </View>
//           <View style={{ flex: 0.1 }}>
//             <TouchableOpacity
//               style={styles.footer}
//               onPress={() => {
//                 this.props.navigation.navigate('Submit');
//               }}>
//               <Text>SUBMIT</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       );
//     }
//   }
// }

 const styles= StyleSheet.create({
  container: {
    flex: 1
  },
  studentChartContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 1
  },
  presentButton: {
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor:'green'
  },
  absentButton: {
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor:'red'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2aa3d9'
  }
});