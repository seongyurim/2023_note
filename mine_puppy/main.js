(() => {

    ////// 전역변수 ////////////////////////////////////////////////////////////////////

    // Scroll-Y 값
    let yOffset = 0;

    // 현재 섹션
    let currentSection = 0;

    // yOffset의 스크롤값을 섹션별로 초기화
    let sectionYOffset = 0;
    
    
    
    ////// 함수 ////////////////////////////////////////////////////////////////////////


    //// 섹션별 정보를 담은 배열 -------------------------------------------
    const sectionSet = [
    
        // section_0
        {
            height : 0,
            hMultiple : 1,
            objs : {
                container : document.querySelector("#section_0"),
            },
            vals : {}
        },
    
        // section_1
        {
            height : 0,
            hMultiple : 3,
            objs : {
                container : document.querySelector("#section_1"),

            },
            vals : {}
        },
    
        // section_2
        {
            height : 0,
            hMultiple : 2,
            objs : {
                container : document.querySelector("#section_2"),
            },
            vals : {}
        }
    ];


    //// 각 섹션의 높이 지정 ----------------------------------------------
    const setLayout = function() {

        let height = 0;

        // 높이가 500px보다 작은 경우는 강제로 500px으로 설정
        if (window.innerHeight < 500) {

            height = 500;

        } else {

            height = window.innerHeight;

        }

        // 각 섹션의 높이 지정
        for (let i = 0; i < sectionSet.length; i++) {

            sectionSet[i].height = height * sectionSet[i].hMultiple;
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;

        }
    }


    ////// 로컬 내비게이션을 특정 시점부터 고정 ---------------------------------------------------------------
    const makeLocalNavFixed = function() {

        if (yOffset > 44) {

            // 고정시키기
            document.body.classList.add('local_nav_fixed');

        } else {

            // 되돌리기
            document.body.classList.remove('local_nav_fixed');

        }

    }




    ////// 이벤트리스너 ////////////////////////////////////////////////////////////////

    window.addEventListener('scroll', () => {

        // 스크롤값 설정
        yOffset = window.scrollY;

        // 로컬 내비게이션을 특정 위치부터 고정
        makeLocalNavFixed();

    });


    window.addEventListener('load', () => {

        // 레이아웃 설정
        setLayout();

        // 스크롤값 설정
        yOffset = window.scrollY;

        // 로컬 내비게이션을 특정 위치부터 고정
        makeLocalNavFixed();

    });


    window.addEventListener('resize', () => {

        // 레이아웃 재설정
        setLayout();

        // CSS 변경
        makeLocalNavFixed();

    });





})();



