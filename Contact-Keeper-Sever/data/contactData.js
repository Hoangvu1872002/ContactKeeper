const contacttArr =[];
for( let i =1; i<=30; i++){
    const  contactObj ={
        name: `contact ${i}`,
        email: `${i}hoangvanvu1872002@gmail.com`,
        phone: `${i}0865217702`,
        type: "personal",
        user:"HoangVux"
    }
    contacttArr.push(contactObj);
}
module.exports = contacttArr;