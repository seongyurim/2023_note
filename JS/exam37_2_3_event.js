
// DOM 구조가 다 만들어진 뒤에 () => {}를 실행시키라고 등록

(document.addEventListener('DOMContentLoaded', () => {

    const h1Element = document.querySelector('h1');        
    const btnChange = document.querySelector('button');
    
    let bFlagHello = true;
    
    btnChange.addEventListener("click", () => {
        
        if (bFlagHello === true) {
    
            h1Element.textContent = "Welcome!";
            bFlagHello = false;
    
        } else {
    
            h1Element.textContent = "Hello";
            bFlagHello = true;
    
        }
    
    });

}));

