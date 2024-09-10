let btnList = document.querySelectorAll(".navtab-btn");
let contentList = document.querySelectorAll(".tab-content-item");
btnList.forEach((btn)=>{
    btn.addEventListener("click", (event)=>{
        //nếu như có có 1 nút bị nhấn thì duyệt danh sách các nút và xóa actived
        btnList.forEach((_btn)=>{
            _btn.classList.remove("actived");
        });
        event.target.classList.add("actived");

        //trc khi mình thêm active vô content thì phải xóa content đang đó trc đó
        contentList.forEach((content)=>{
            content.classList.remove("actived");
        })
        //lấy id của thằng bị bấm 
        // let id = event.target.getAttribute("id");
        let id = event.target.id;
        let contentChecked = document.querySelector(`
            .tab-content-item[data-id="${id}"]    
        `);
        contentChecked.classList.add("actived");
    } );
});
