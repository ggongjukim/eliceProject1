/**
 * @author: 김상현
 * @date: 2022-11-04
 * @detail: 마이페이지를 위한 js파일입니다.
 */

import * as Api from "/api.js";
// import { validateEmail } from "/useful-functions.js";

// // 요소(element), input 혹은 상수
// const userAdmin = document.querySelector("#user-admin");
// const userName = document.querySelector("#user-name");
// const userNameButton = document.querySelector("#user-name-button");
// const userEmail = document.querySelector("#user-email");
// const userPasswordButton = document.querySelector("#user-password-button");
// const userPostCode = document.querySelector("#user-postcode");
// const userAddress = document.querySelector("#user-address");
// const userAddressButton = document.querySelector("#user-address-button");
// const userWithdrawButton = document.querySelector("#user-withdraw-button");
// const usersInfoButton = document.querySelector("#users-info-button");

// addAllElements();
// addAllEvents();

// // html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// async function addAllElements() {
//   insertUserInfo();
// }

// // 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
// function addAllEvents() {
//   userNameButton.addEventListener("click", changeNameHandler);
//   userPasswordButton.addEventListener("click", changePasswordHandler);
//   userAddressButton.addEventListener("click", changeAddressHandler);
//   userWithdrawButton.addEventListener("click", withdrawUserHandler);
//   usersInfoButton.addEventListener("click", loadUsersInfoHandler);
// }

// // 유저 정보(isAdmin, 이름, 이메일, 주소, 우편번호) 조회 및 화면에 표시
// async function insertUserInfo() {
//   try {
//     const userInfo = await Api.get("/api/me");
//     const { isAdmin, fullName, email, address, postCode } = userInfo;

//     insertIsAdmin(isAdmin);
//     insertUserName(fullName);
//     insertUserEmail(email);
//     insertUserAddress(address);
//     insertUserPostCode(postCode);
//   } catch (err) {
//     console.error(err.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//     // location.replace("/login");
//   }
// }

// // 관리자일때만 보이는 요소들 랜더링
// function insertIsAdmin(isAdmin) {
//   if (isAdmin) {
//     userAdmin.style.removeProperty("display");
//     usersInfoButton.style.removeProperty("display");
//   } else {
//     userAdmin.style.display = "none";
//     usersInfoButton.style.display = "none";
//   }
// }

// function insertUserName(fullName) {
//   userName.innerText = fullName;
// }

// async function insertUserEmail(email) {
//   userEmail.innerText = email;
// }

// function insertUserAddress(address) {
//   userAddress.innerText = address;
// }

// function insertUserPostCode(postCode) {
//   userPostCode.innerText = postCode;
// }

// // 유저 이름 변경
// async function changeNameHandler(e) {
//   const fullName = prompt("변경할 이름을 입력하세요.");
//   const isFullNameValid = fullName.length >= 2;
//   if (!isFullNameValid) {
//     return alert("이름은 2글자 이상이어야 합니다.");
//   }
//   const currentPassword = prompt("이름을 변경하려면 비밀번호를 입력하세요.");
//   try {
//     const data = { fullName, currentPassword };
//     const user = await Api.patch("", "api/user", data);
//     const updatedFullName = user.fullName;
//     userName.innerText = updatedFullName;
//     alert(`이름이 ${updatedFullName}으로 변경되었습니다.`);
//   } catch (err) {
//     console.error(err.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//   }
// }

// // 유저 패스워드 변경
// async function changePasswordHandler(e) {
//   try {
//     const isConfirm = confirm("정말 비밀번호를 변경하시겠습니까?");
//     if (isConfirm) {
//       const currentPassword = prompt("현재 비밀번호를 입력하세요.");
//       const password = prompt("새로운 비밀번호를 입력하세요.");
//       const isPasswordValid = password.length >= 4;
//       if (!isPasswordValid) {
//         return alert("비밀번호는 4글자 이상이어야 합니다.");
//       } else if (currentPassword === password) {
//         return alert("이전 비밀번호와 같습니다.");
//       }
//       const data = { currentPassword, password };
//       const user = await Api.patch("", "api/user", data);
//       alert("비밀번호가 성공적으로 변경되었습니다.");
//     }
//   } catch (err) {
//     console.error(err.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//   }
// }

// // 유저 주소 변경
// async function changeAddressHandler(e) {
//   const address = prompt("변경할 주소를 입력하세요.");
//   const isAddressValid = address.length >= 2;
//   if (!isAddressValid) {
//     return alert("올바른 주소를 입력해주세요.");
//   }
//   const postCode = prompt("변경할 우편번호를 입력하세요.");
//   const isPostCodeValid = postCode.length === 5;
//   if (!isPostCodeValid) {
//     return alert("우편번호는 숫자 5자리를 입력해 주세요.");
//   }
//   const currentPassword = prompt("주소를 변경하려면 비밀번호를 입력하세요.");
//   try {
//     const data = { address, currentPassword, postCode };
//     const user = await Api.patch("", "api/user", data);
//     const updatedAddress = user.address;
//     const updatedPostCode = user.postCode;
//     userAddress.innerText = updatedAddress;
//     userPostCode.innerText = updatedPostCode;
//     alert(
//       `주소가 ${updatedAddress}으로, 우편번호가 ${updatedPostCode}으로 변경되었습니다.`
//     );
//   } catch (err) {
//     console.error(err.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//   }
// }

// // 회원탈퇴 (DB에서 회원정보 삭제함)
// async function withdrawUserHandler(e) {
//   const isWithdraw = confirm("정말 회원 탈퇴를 하시겠습니까?");
//   if (isWithdraw) {
//     const password = prompt("회원탈퇴를 하려면 비밀번호를 입력하세요");
//     try {
//       const data = { password };
//       const user = await Api.post("/api/signout", data);
//       alert("회원탈퇴가 완료되었습니다.");
//       localStorage.removeItem("token");
//       localStorage.removeItem("isAdmin");
//       document.location.href = "/";
//     } catch (err) {
//       console.error(err.stack);
//       alert(
//         `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
//       );
//     }
//   }
// }

// // 관리자일때만 사용가능한 유저정보 콘솔로 불러오기
// // (adminRequired 미들웨어가 잘 작동하는지 테스트 하기 위함)
// async function loadUsersInfoHandler(e) {
//   try {
//     const users = await Api.get("", "api/userlist");
//     console.log(users);
//   } catch (err) {
//     console.error(err.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
//   }
// }

/**
 * @author 차지환
 * @date 2022-11-09
 * @description 고객의 주문정보를 조회, 수정, 삭제 하는 코드입니다.
 */

let data = null;
let currentPage = null;
let last = null;
let first = null;
let totalP = null;

const $ul = document.querySelector("#page-btn");
const $table = document.querySelector(".order-table");
const $noData = document.querySelector(".no-data");
const $orderData = document.querySelector(".order-data");

async function getOrderInfoData(currentPage) {
  // let data = Api.get('/api',`orderlist/me?page=${currentPage}&perPage=5`)
  data = await fetch("./test.json").then((res) => res.json());
  currentPage = data.page;
  console.log(data);
  if (data.orders.length > 0) {
    $noData.classList.add("hidden");
    $orderData.classList.remove("hidden");
    renderOrderList(data);
  }
}

function renderOrderList({ page, perPage, totalPage, totalCount, orders }) {
  const orderState = {
    WAIT: "배송준비 중",
    INPROGRESS: "배송 중",
    COMPLETED: "배송 완료",
    CANCEL: "주문 취소",
  };

  $table.innerHTML = "";

  const orderHTML = orders
    .map(({ _id, createdAt, process, list }) => {
      const total = list.reduce(
        (acc, { amount, product }) => acc + product.price * amount,
        0
      );
      const ship = total >= 30000 ? "무료" : "3,000원";
      return list
        .map(({ amount, product: { name, images, price, _id } }, index) => {
          const productPrice = (amount * price).toLocaleString();
          return index === 0
            ? `
        <tr>
          <td
            class="product-order-num"
            rowspan="${list.length}"
            align="center"
            style="vertical-align: middle"
          >
            ${_id}<br/>(${createdAt.slice(0, 10)})
          </td>
          <td class="product-info" align="center">
            <div class="product-image-wrapper">
              <img class="product-image" src="${images[0]}" alt="상품 이미지" />
            </div>
            <div class="product-name-wrapper">
              <p class="product-name">
                ${name}
              </p>
            </div>
          </td>
          <td class="product-price-wrapper" align="center">
            <p class="product-price">${productPrice}원<br />(${amount}개)</p>
          </td>
          <td rowspan="${list.length}" align="center">
            <p>${ship}</p>
          </td>
          <td rowspan="${list.length}" align="center">
            <p>
              ${orderState[process]}
            </p>
          </td>
          <td rowspan="${list.length}" align="center">
            <button class="order-cancel" data-id="${_id}"}>주문 취소</button>
          </td>
        </tr>`
            : `
        <tr>
          <td class="product-info" align="center">
            <div class="product-image-wrapper">
              <img class="product-image" src="${images[0]}" alt="상품 이미지" />
            </div>
            <div class="product-name-wrapper">
              <p class="product-name">
                ${name}
              </p>
            </div>
          </td>
          <td class="product-price-wrapper" align="center">
            <p class="product-price">${productPrice}원<br />(${amount}개)</p>
          </td>
        </tr>`;
        })
        .join("");
    })
    .join("");

  $table.insertAdjacentHTML(
    "beforeend",
    `            <th>주문 번호<br />주문 일자</th>
  <th>주문 상품 정보</th>
  <th>상품 금액(수량)</th>
  <th>배송비</th>
  <th>배송 상태</th>
  <th>주문 취소<th>
  `
  );
  $table.insertAdjacentHTML("beforeend", orderHTML);
  pagenation(page, perPage, totalPage, totalCount);
}

function pagenation(page, perPage, totalPage, totalCount) {
  $ul.innerHTML = "";
  if (totalCount <= 5) return;
  const pageGroup = Math.ceil(page / 5);
  totalP = totalPage;
  last = pageGroup * 5;
  last > totalPage && (last = totalPage);
  first = last - 4;
  first < 0 && (first = 1);
  let prev = first - 1;

  if (prev > 0) {
    $ul.insertAdjacentHTML(
      "beforeend",
      `
    <li>
      <a class="all-prev-btn">&lt;&lt;&nbsp;</a>
    </li>
    <li>
      <a class="prev-btn">&lt;</a>
    </li>
    `
    );
  }

  for (let i = first; i <= last; i++) {
    $ul.insertAdjacentHTML(
      "beforeend",
      `<li><a data-page="${i}">${i}</a></li>`
    );
  }

  if (last < totalPage) {
    $ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
      <a class="next-btn">&gt;</a>
      </li>
      <li>
        <a class="all-next-btn">&nbsp;&gt;&gt;</a>
      </li>
    `
    );
  }

  document.querySelector(`a[data-page="${page}"]`).classList.add("active");
}

$ul.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.dataset.page) {
    getOrderInfoData(target.dataset.page);
  }

  switch (target.className) {
    case "all-prev-btn":
      getOrderInfoData(1);
      break;
    case "prev-btn":
      getOrderInfoData(first - 1);
      break;
    case "all-next-btn":
      getOrderInfoData(totalP);
      break;
    case "next-btn":
      getOrderInfoData(last + 1);
      break;
  }
});

$table.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  switch (target.className) {
    case "order-cancel":
      const id = target.dataset.id;
      Api.patch("/api/order", id, { process: "CANCEL" });
      getOrderInfoData(currentPage);
      target.innerText = "취소 완료";
      target.disabled = true;
      break;
  }
});

getOrderInfoData();
