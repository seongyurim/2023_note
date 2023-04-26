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
            vals : {

            }
        },
    
        // section_1
        {
            height : 0,
            hMultiple : 8,
            objs : {
                container : document.querySelector("#section_1"),
                messageA : document.querySelector(".sec1_msg.a"),
                messageB : document.querySelector(".sec1_msg.b"),
                messageC : document.querySelector(".sec1_msg.c"),
                messageD : document.querySelector(".sec1_msg.d"),
                messageE : document.querySelector(".sec1_msg.e"),

                imageA : document.querySelector(".sec1_img.f"),
                imageB : document.querySelector(".sec1_img.g"),
                imageC : document.querySelector(".sec1_img.h"),
                imageD : document.querySelector(".sec1_img.i"),
                imageE : document.querySelector(".sec1_img.j")
            },
            vals : {
                messageA_fade_in :       [0, 1,     {start: 0.02, end: 0.10}],
                messageA_fade_out :      [1, 0,     {start: 0.12, end: 0.20}],
                messageA_transY_in :     [20, -30,   {start: 0.02, end: 0.10}],
                messageA_transY_out :    [-30, -60, {start: 0.12, end: 0.20}],
        
                messageB_fade_in :       [0, 1,     {start: 0.22, end: 0.30}],
                messageB_fade_out :      [1, 0,     {start: 0.32, end: 0.40}],
                messageB_transY_in :     [20, -30,   {start: 0.22, end: 0.30}],
                messageB_transY_out :    [-30, -60, {start: 0.32, end: 0.40}],
        
                messageC_fade_in :       [0, 1,     {start: 0.42, end: 0.50}],
                messageC_fade_out :      [1, 0,     {start: 0.52, end: 0.60}],
                messageC_transY_in :     [20, -30,   {start: 0.42, end: 0.50}],
                messageC_transY_out :    [-30, -60, {start: 0.52, end: 0.60}],
        
                messageD_fade_in :       [0, 1,     {start: 0.62, end: 0.70}],
                messageD_fade_out :      [1, 0,     {start: 0.72, end: 0.80}],
                messageD_transY_in :     [20, -30,   {start: 0.62, end: 0.70}],
                messageD_transY_out :    [-30, -60, {start: 0.72, end: 0.80}],
        
                messageE_fade_in :       [0, 1,     {start: 0.82, end: 0.90}],
                messageE_fade_out :      [1, 0,     {start: 0.92, end: 1.00}],
                messageE_transY_in :     [20, -30,   {start: 0.82, end: 0.90}],
                messageE_transY_out :    [-30, -60, {start: 0.92, end: 1.00}], 
            }
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
            hMultiple : 1,
            objs : {
                container : document.querySelector("#section_3"),
            },
            vals : {}
        }
    ];


    ////// 각 섹션의 높이 지정 -------------------------------------------------------------------------------
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


    ////// 로컬 내비게이션 컬러 변경 ----------------------------------------------------------------------
    const changeLocalNavColor = function() {

        const $localNav = document.querySelector(".local_nav");
        if (currentSection > 0) {
            $localNav.classList.add('local_nav_overSec0')
        } else {
            $localNav.classList.remove('local_nav_overSec0');
        }

    }


    // ////// 섹션0의 타이틀에 트랜지션 부여 ---------------------------------------------------------------------
    // const setTitleTransY = function() {

    //     const $titleTransY = document.querySelector(".sec0_txt_inner");
    //     $titleTransY.setAttribute('class', 'sec0_txt_inner_transY');

    // }


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
    const hideScrollBtn = function() {

        if (yOffset > 0) {

            $scrollBtn.style.opacity = 1;

        } else {

            $scrollBtn.style.opacity = 0;

        }

    }


    ////// 부제목 트랜지션 ------------------------------------------------------------------------------------
    const sec0_subtitle_transY = function() {

        const $subtitle_left = document.querySelector(".sec0_txt_subtitle_left");
        const $subtitle_right = document.querySelector(".sec0_txt_subtitle_right");
        $subtitle_left.classList.add('sec0_txt_subtitle_left_transY');
        $subtitle_right.classList.add('sec0_txt_subtitle_right_transY');

    }



    ////// 스크롤된 시점의 섹션명 도출 ------------------------------------------------------------------------
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
            // 발생할 일이 없지만~
            console.error("[ERROR] getCurrentSection()");
        }
        return section;
    }


    ////// body ID를 섹션에 맞게 변경 -----------------------------------------------------------------------
    const setBodyID = function(section) {
        document.body.setAttribute("id", `show_section${section}`);
    }


    ////// 이전 섹션의 높이 구하기 --------------------------------------------------------------------------
    const getPrevSecHeight = function() {

        let prevHeight = 0;

        for (let i = 0; i < currentSection; i++) {
            prevHeight = prevHeight + sectionSet[i].height;
        }
        return prevHeight;
    }


    ////// 애니메이션 범위 할당 ----------------------------------------------------------------------------
    const calcValue = function(values) {

        let result = 0; // 결과(CSS값)
        let ratio = 0;  // 비율

        // 부분 애니메이션 계산 시 필요한 변수
        let partStart = 0;
        let partEnd = 0;
        let partDistance = 0;

        // 현재 섹션의 높이
        const curHeight = sectionSet[currentSection].height;

        // [1, 0];
        if (values.length === 2) {

            // 비율 구하기
            ratio = sectionYOffset / curHeight;

            // 비율에 따른 CSS값 구하기
            result = ((values[1] - values[0]) * ratio) + values[0];

        }

        // [1, 0, {start, end}]
        else if (values.length === 3) {

            partStart = values[2].start * curHeight;
            partEnd = values[2].end * curHeight;
            partDistance = partEnd - partStart;

            if (sectionYOffset < partStart) {

                result = values[0];

            } else if (sectionYOffset > partEnd) {

                result = values[1];
            } else {

                ratio = (sectionYOffset - partStart) / partDistance;
                result = ((values[1] - values[0]) * ratio) + values[0];
 
            }

        }

        return result;

    }


    ////// 섹션별 애니메이션 실행 -------------------------------------------------------------------
    const playAnimation = function() {

        let opacity = 0;
        let scrollRate = sectionYOffset / sectionSet[currentSection].height; // 0~1 사이의 값이 나온다.

        let values = sectionSet[currentSection].vals;
        let objects = sectionSet[currentSection].objs;

        switch(currentSection) {
        // 현재 스크롤된 위치가 어느 섹션인가?

            case 0:
                // console.log("0번 섹션 애니메이션 실행중");
                break;
                
            case 1:
                // 스크롤업 시 투명도 0%
                objects.messageA.style.opacity = 0;
                objects.messageB.style.opacity = 0;
                objects.messageC.style.opacity = 0;
                objects.messageD.style.opacity = 0;
                objects.messageE.style.opacity = 0;
                objects.imageA.style.opacity = 0;
                objects.imageB.style.opacity = 0;
                objects.imageC.style.opacity = 0;
                objects.imageD.style.opacity = 0;
                objects.imageE.style.opacity = 0;
               
                if (scrollRate < 0.12) {                                        // messageA

                    opacity = calcValue(values.messageA_fade_in);
                    objects.messageA.style.opacity = opacity;
                    objects.imageA.style.opacity = opacity;

                    translateY = calcValue(values.messageA_transY_in);
                    objects.imageA.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.12) && (scrollRate < 0.22)) {

                    opacity = calcValue(values.messageA_fade_out);
                    objects.messageA.style.opacity = opacity;
                    objects.imageA.style.opacity = opacity;

                    translateY = calcValue(values.messageA_transY_out);
                    objects.imageA.style.transform = `translateY(${translateY}%)`;


                } else if ((scrollRate >= 0.22) && (scrollRate < 0.32)) {       // messageB

                    opacity = calcValue(values.messageB_fade_in);
                    objects.messageB.style.opacity = opacity;
                    objects.imageB.style.opacity = opacity;

                    translateY = calcValue(values.messageB_transY_in);
                    objects.imageB.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.32) && (scrollRate < 0.42)) {

                    opacity = calcValue(values.messageB_fade_out);
                    objects.messageB.style.opacity = opacity;
                    objects.imageB.style.opacity = opacity;

                    translateY = calcValue(values.messageB_transY_out);
                    objects.imageB.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.42) && (scrollRate < 0.52)) {       // messageC

                    opacity = calcValue(values.messageC_fade_in);
                    objects.messageC.style.opacity = opacity;
                    objects.imageC.style.opacity = opacity;

                    translateY = calcValue(values.messageC_transY_in);
                    objects.imageC.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.52) && (scrollRate < 0.62)) {

                    opacity = calcValue(values.messageC_fade_out);
                    objects.messageC.style.opacity = opacity;
                    objects.imageC.style.opacity = opacity;

                    translateY = calcValue(values.messageC_transY_out);
                    objects.imageC.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.62) && (scrollRate < 0.72)) {       // messageD

                    opacity = calcValue(values.messageD_fade_in);
                    objects.messageD.style.opacity = opacity;
                    objects.imageD.style.opacity = opacity;

                    translateY = calcValue(values.messageD_transY_in);
                    objects.imageD.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.72) && (scrollRate < 0.82)) {

                    opacity = calcValue(values.messageD_fade_out);
                    objects.messageD.style.opacity = opacity;
                    objects.imageD.style.opacity = opacity;

                    translateY = calcValue(values.messageD_transY_out);
                    objects.imageD.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.82) && (scrollRate < 0.92)) {       // messageE

                    opacity = calcValue(values.messageE_fade_in);
                    objects.messageE.style.opacity = opacity;
                    objects.imageE.style.opacity = opacity;

                    translateY = calcValue(values.messageE_transY_in);
                    objects.imageE.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.92) && (scrollRate < 0.95)) {

                    opacity = calcValue(values.messageE_fade_out);
                    objects.messageE.style.opacity = opacity;
                    objects.imageE.style.opacity = opacity;

                    translateY = calcValue(values.messageE_transY_out);
                    objects.imageE.style.transform = `translateY(${translateY}%)`;
                }
                // console.log("1번 섹션 애니메이션 실행중");
                break;

            case 2:
                // console.log("2번 섹션 애니메이션 실행중");
                break;

            case 3:
                // console.log("3번 섹션 애니메이션 실행중");
                break;

            default:
                console.error("[ERROR] playAnimation()");
                break;

        }

    }
    







    ////// 이벤트리스너 ////////////////////////////////////////////////////////////////

    window.addEventListener('scroll', () => {

        // 스크롤값 설정
        yOffset = window.scrollY;

        // 로컬 내비게이션을 특정 위치부터 고정
        makeLocalNavFixed();

        // 스크롤 버튼이 섹션0(탑)에서만 안보이게
        hideScrollBtn();

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();
        // console.log(currentSection);

        // 섹션별 스크롤값 초기화
        sectionYOffset = yOffset - getPrevSecHeight();

        // CSS 변경..
        setBodyID(currentSection);
        changeLocalNavColor();

        // 애니메이션 실행
        playAnimation();

    });


    window.addEventListener('load', () => {

        // 레이아웃 설정
        setLayout();

        // 스크롤값 설정
        yOffset = window.scrollY;

        // 로컬 내비게이션을 특정 위치부터 고정
        makeLocalNavFixed();

        // // 탑 텍스트 트랜지션
        // setTitleTransY();

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // CSS 변경..
        setBodyID(currentSection);
        sec0_subtitle_transY();

    });


    window.addEventListener('resize', () => {

        // 레이아웃 재설정
        setLayout();

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // 섹션별 스크롤값 초기화
        sectionYOffset = yOffset - getPrevSecHeight();

        // CSS 변경
        makeLocalNavFixed();
        sec0_subtitle_transY();


        setBodyID(currentSection);

    });



    // 화살표 버튼을 클릭하면 최상단으로 스크롤
    $scrollBtn.addEventListener('click', backToTop);
    





})();



