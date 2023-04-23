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
            hMultiple : 2,
            objs : {
                container : document.querySelector("#section_1"),

            },
            vals : {}
        },
    
        // section_2
        {
            height : 0,
            hMultiple : 1,
            objs : {
                container : document.querySelector("#section_2"),
            },
            vals : {}
        },

        // section_3
        {
            height : 0,
            hMultiple : 2,
            objs : {
                container : document.querySelector("#section_3"),
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


    ////// 섹션0의 타이틀에 트랜지션 부여 ---------------------------------------------------------------------
    const setTitleTransY = function() {

        const $titleTransY = document.querySelector(".sec0_txt_inner");
        $titleTransY.setAttribute('class', 'sec0_txt_inner_transY');

    }


    ////// 화살표 버튼을 클릭하면 최상단으로 스크롤 -----------------------------------------------------------
    const $scrollBtn = document.querySelector('.scrollToTop');
    const backToTop = function() {
        
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }


    ////// 화살표 버튼이 섹션0(탑)에 있을 때만 안보이게 --------------------------------------------------------
    const HideScrollBtn = function() {

        if (yOffset > 0) {

            $scrollBtn.style.opacity = 1;

        } else {

            $scrollBtn.style.opacity = 0;

        }

    }


    ////// 스크롤된 시점의 섹션명 도출 ---------------------------------------------------
    const getCurrentSection = function() {

        let segment = [
            sectionSet[0].height,
            sectionSet[0].height + sectionSet[1].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height + sectionSet[3].height
        ]

        let section = 0

        if (yOffset <= segment[0]) {
            section = 0;
        }
        else if ((yOffset > segment[0]) && (yOffset <= segment[1])) {
            section = 1;
        }
        else if ((yOffset > segment[1]) && (yOffset <= segment[2])) {
            section = 2;
        }
        else if ((yOffset > segment[2]) && (yOffset <= segment[3])) {
            section = 3;
        }
        else {
            // 올 일이 없지만 작성해둔다.
            console.error("[ERROR] getCurrentSection()");
        }
        return section;
    }


    ////// body ID를 section0에서 1로 변경
    const setBodyID = function(section) {
        document.body.setAttribute("id", `show_section${section}`);
    }










    ////// 이벤트리스너 ////////////////////////////////////////////////////////////////

    window.addEventListener('scroll', () => {

        // 스크롤값 설정
        yOffset = window.scrollY;

        // 로컬 내비게이션을 특정 위치부터 고정
        makeLocalNavFixed();

        // 스크롤 버튼이 섹션0(탑)에서만 안보이게
        HideScrollBtn();

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();
        console.log(currentSection);

        // CSS 변경..
        setBodyID(currentSection);

    });


    window.addEventListener('load', () => {

        // 레이아웃 설정
        setLayout();

        // 스크롤값 설정
        yOffset = window.scrollY;

        // 로컬 내비게이션을 특정 위치부터 고정
        makeLocalNavFixed();

        // 탑 텍스트 트랜지션
        setTitleTransY();

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // CSS 변경..
        setBodyID(currentSection);


    });


    window.addEventListener('resize', () => {

        // 레이아웃 재설정
        setLayout();

        // CSS 변경
        makeLocalNavFixed();

    });

    // 화살표 버튼을 클릭하면 최상단으로 스크롤
    $scrollBtn.addEventListener('click', backToTop);
    





})();



