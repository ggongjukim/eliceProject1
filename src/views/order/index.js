import * as Api from '/api.js';
const testdata1 = [
    {
        user: "elice0",
        product : "product0",
        address : "seoul",
        amount : 2,
        process: "WAIT",
        orderDate : "2022-10-31"
    },
    {
        user: "elice1",
        product : "product1",
        address : "seoul",
        amount : 3,
        process: "COMPLETED",
        orderDate : "2022-10-31"

    },
    {
        user: "elice2",
        product : "product2",
        address : "seoul",
        amount : 4,
        process: "INPROCESS",
        orderDate : "2022-10-31"

    },
]

let orderList = document.querySelector("#template");


//get
//데이터 갯수 만큼 노드 복제
let idNum = 0;
async function deepCopy(idx)  {
  const testdata = await Api.get('/api/admin/order');
  // 'test' node 선택
  const testDiv = document.querySelector('#template');
  // 노드 복사하기 (deep copy)
  const newNode = testDiv.cloneNode(true);
  // 복사된 Node id 변경하기
  newNode.id = 'copyNode' + idNum;
  idNum++;
  // 복사한 노드 붙여넣기
  testDiv.after(newNode);
  //값 넣기
  newNode.querySelector(".user").textContent = testdata[idx].user;
  newNode.querySelector(".product").textContent = testdata[idx].product;
  newNode.querySelector(".orderPrice").textContent = 9900*testdata[idx].amount;//product price
  newNode.querySelector(".orderDate").textContent = testdata[idx].orderDate;
  //옵션 - 배송상태
  let selectList = newNode.querySelectorAll(".process select option")
  selectList.forEach(item =>{
    if(item.value ===  testdata[idx].process){
        item.selected = true
    }
  })

  console.log(selectList)
  if(testdata[idx].process!="COMPLETED"){
    newNode.querySelector("#deleteBtn").parentElement.style = "none";
    newNode.removeChild(newNode.querySelector("#deleteBtn").parentElement);
    console.log("삭제버튼 안보임")
  }

}

for(let i=0;i<testdata.length ;i++){
    deepCopy(i);
}
orderList.style.display = "none";





//삭제 기능 - complete 일때만 삭제 버튼 보여야함
let deleteBtnList = document.querySelectorAll('#deleteBtn');
console.log(deleteBtnList)

function removeList(e) {
    console.log("e",e.target.parentElement.parentElement)
    if (confirm('정말 삭제합니까?')) {
        var li = e.target.parentElement.parentElement;
        document.querySelector("body").removeChild(li);
        console.log("삭제함")
        
        //데이터에서도 삭제
        deleteOrder() // 인자로 무엇을 넣어줘야하지
      }

  }
console.log(typeof deleteBtnList)
deleteBtnList.forEach(item=>{
    item.addEventListener('click',removeList)
})

async function deleteOrder(data){
    const result = await Api.delete('/api/admin/order', data);

}

//수정 기능
let changeBtnList = document.querySelectorAll('#changeBtn');

function reviseList(e){
    console.log("reviseList")
    
    console.log(e.target.parentElement.parentElement.querySelector(".user").textContent)

    testdata.map(item=>{
        if(item.user === e.target.parentElement.parentElement.querySelector(".user").textContent){
            console.log("이름 같음")
            e.target.parentElement.parentElement.querySelectorAll(".process select option").forEach(item2=>{
                if(item2.selected === true) item.process = item2.value; //testdata 넣어주기


                // 배송완료일 경우 삭제버튼 붙이기 - 
                if(item.process !== "COMPLETED"){
                    let deleteBtn2 = document.querySelectorAll('#template #deleteBtn');
                    e.target.parentElement.parentElement.querySelector("#deleteBtn").style.display ="none"
                }else{
                    e.target.parentElement.parentElement.querySelector("#deleteBtn").style.display ="block"
            
                }

            });

        }
    })

}
changeBtnList.forEach(item=>{ item.addEventListener('click',reviseList)})