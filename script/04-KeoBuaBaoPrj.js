const VALUES = [
    {id:"scissors", value: "✌🏻"}, //0
    {id:"rock", value: "✊🏻"}, //1
    {id:"paper", value: "🖐🏻"}, //2
];

// phân tích logic
//muốn code game thì phải tìm hiểu quy luật của game
//khi nào thì thắng
//thắng: 0 - 2 = -2
//       1 - 0 = 1
//       2 - 1 = 1
//indexPlayer - indexComputer = -2 || 1 => win return 1
//indexPlayer - indexComputer = 0 ||   => draw return 0
//else                           ||   => lose return -1

let i = 0;
const handleChange = () => {
    let computer = document.querySelector("#computer");
    computer.textContent = VALUES[i].value;
    computer.setAttribute("data-id", VALUES[i].id);
    // if(i === VALUES.length - 1) i = 0;
    // else i++;s
    i = i === VALUES.length - 1 ? i = 0 : ++i;
};

let interval = setInterval(handleChange, 100); //giống setTimeOut nhưng chạy mãi mãi

// hàm so sánh giá trị phân thắng:1 hòa:0 thua:-1
const compare = (valuePlayer, valueComputer) => {
    //tìm index của các value tương ứng 
    let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer); //lấy index của value player
    let indexComputer = VALUES.findIndex((_item) => _item.id == valueComputer); //lấy index của value computer
    let result = indexPlayer - indexComputer;
    
    if([-2, 1].includes(result)) return 1;
    else if(result == 0) return 0;
    else return -1;
}

let playerItem = document.querySelectorAll(".user");
playerItem.forEach((item) => {
    //cho tất cả bọn nó đều lắng nghe sự kiện click
    item.addEventListener("click", (event)=>{
        //dừng máy lại và lấy data-id
        clearInterval(interval);
        let valueComputer = document.querySelector("#computer").dataset.id; //getAttribute("data-id"); xài dataset.id chỉ duy nhất thay thế cho data-id

        //lấy id của thằng vừa nhấn
        let valuePlayer = event.target.id;
        
        //so sánh lấy kết quả
        let result = compare(valuePlayer, valueComputer);

        //duyệt các nút và xóa actived
        playerItem.forEach((_item) => { 
            _item.classList.remove("actived");
            _item.style.pointerEvents = "none";//khống chế ko cho người dùng chọn 
        });

        //thêm active cho nút vừa nhấn
        event.target.classList.add("actived");

        //kết luận
        let alertDiv = document.createElement("div");
        alertDiv.classList.add("alert");
        let msg = "";
        if(result == 1){
            msg = "Bạn Thắng";
            alertDiv.classList.add("alert-success");
        }else if(result == 0){
            msg = "Bạn Hòa";
            alertDiv.classList.add("alert-warning");
        }else {
            msg = "Bạn Thua";
            alertDiv.classList.add("alert-dark");
        }
        alertDiv.textContent = msg;
        document.querySelector(".notification").appendChild(alertDiv);

        //hiện nút chơi lại
        document.querySelector("#play-again").classList.remove("d-none");

    });
});

//sự kiện click chơi lại
document.querySelector(".btn-play-again").addEventListener("click",(event) => {
    clearInterval(interval); //
    interval = setInterval(handleChange, 100);

    //xóa actived của các nút và khôi phục khả năng click
    playerItem.forEach((_item) => {
        _item.classList.remove("actived");
        _item.style.pointerEvents = ""; //khôi phục sự kiện chuột
    });
    //xóa thông báo
    document.querySelector(".notification").innerHTML = "";
    //ẩn nút chơi lại
    document.querySelector("#play-again").classList.add("d-none");
});