(() => {

    ////// 필요한 전역변수 생성하기 ///////////////////////////////////////////////////////////////////////////

    // Scroll-Y 값
    let yOffset = 0;

    // 현재 섹션
    let currentSection = 0;

    // yOffset의 스크롤값을 섹션별로 초기화
    let sectionYOffset = 0;




    ////// 함수 생성하기 //////////////////////////////////////////////////////////////////////////////////////

    ////// 섹션의 정보를 배열 속 오브젝트에 생성 -----------------------------------------------
    const sectionSet = [
        // section-0의 정보
        {
            height : 0,
            hMultiple : 5,
            objs : {container : document.querySelector("#section-0"),
                    messageA : document.querySelector(".section0-message.a"), //클래스 두개를 같이 가져올 때(붙여서 가져오기! 공백이 있으면 하위 선택자라는 뜻이므로)
                    messageB : document.querySelector(".section0-message.b"),
                    messageC : document.querySelector(".section0-message.c"),
                    messageD : document.querySelector(".section0-message.d"),
            },

            vals : {
                messageA_fade_in :       [0, 1,     {start: 0.03, end: 0.12}], 
                messageA_fade_out :      [1, 0,     {start: 0.13, end: 0.23}],
                messageA_transY_in :     [0, -30,   {start: 0.03, end: 0.12}],
                messageA_transY_out :    [-30, -60, {start: 0.13, end: 0.23}],

                messageB_fade_in :       [0, 1,     {start: 0.27, end: 0.37}], 
                messageB_fade_out :      [1, 0,     {start: 0.38, end: 0.48}],
                messageB_transY_in :     [0, -30,   {start: 0.27, end: 0.37}],
                messageB_transY_out :    [-30, -60, {start: 0.38, end: 0.48}],

                messageC_fade_in :       [0, 1,     {start: 0.52, end: 0.61}], 
                messageC_fade_out :      [1, 0,     {start: 0.62, end: 0.73}],
                messageC_transY_in :     [0, -30,   {start: 0.52, end: 0.61}],
                messageC_transY_out :    [-30, -60, {start: 0.62, end: 0.73}],

                messageD_fade_in :       [0, 1,     {start: 0.77, end: 0.86}], 
                messageD_fade_out :      [1, 0,     {start: 0.87, end: 0.90}],
                messageD_transY_in :     [0, -30,   {start: 0.77, end: 0.86}],
                messageD_transY_out :    [-30, -60, {start: 0.87, end: 0.90}]
            },
        },


        // section-1의 정보
        {
            height : 0,
            hMultiple : 4,
            objs : {container : document.querySelector("#section-1")}
        }
    ];


    ////// 각 섹션의 높이를 정하는 함수 ---------------------------------------------------------
    const setLayout = function() {

        let height = 0;
        
        // 높이가 500px보다 작은 경우는 강제로 500으로 설정한다.
        if (window.innerHeight < 500) {
            
            height = 500;
            
        } else {
            
            height = window.innerHeight;            
            
        }
        
        // 각 섹션의 높이를 설정한다.
        for (let i = 0; i < sectionSet.length; i++) {

            sectionSet[i].height = height * sectionSet[i].hMultiple;
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;
            
        }
    }    
    // 지금 이 위치에서 이 함수가 일회성으로 setLayout(); 호출되면 생기는 문제?
    // 특정 사이즈로 보다가 사용자가 브라우저 크기를 변경했을 경우
    // 그 바뀐 사이즈로 바로 바뀌지 않고, 새로고침을 해야만 변경된다.
    // 따라서 크기가 변경될 때마다 함수가 호출되어야 하겠다.


    /////// 스크롤된 시점의 섹션명을 도출하는 함수 -----------------------------------------------------
    const getCurrentSection = function(){

        let segment = [
            sectionSet[0].height,
            sectionSet[0].height + sectionSet[1].height
        ];
        // 지금은 섹션이 2개라서 특정 스크롤 숫자를 넘냐/안넘냐의 차이라 배열이 굳이 필요 없지만
        // 섹션이 4개라면 특정 스크롤 숫자가 3개가 필요하기 때문에 이럴 때에는 배열을 사용하는 것이 좋다.

        let section = 0;
        if (yOffset <= segment[0]) {

            section = 0;

        } else if ((yOffset > segment[0]) && (yOffset <= segment[1])) {

            section = 1;

        } else {

            // 올 일이 없다.
            console.error("[ERROR] getCurrentSection()");
        }

        return section;

    }


    ////// body ID를 section0에서 section1로 변경하는 함수 ---------------------------------------------------------
    ////// sticky-element를 보이게-안보이게 전환시키기 위해
    const setBodyID = function(section) {

        document.body.setAttribute("id", `show-section${section}`);

    }



    ////// local-nav를 특정 시점부터 고정시키는 함수 ---------------------------------------------------------------
    const setLocalnavMenu = function() {

        if (yOffset > 44) {

            // local-nav를 fixed.
            document.body.classList.add('local-nav-sticky');

        } else {

            // local-nav를 원래 상태로.
            document.body.classList.remove('local-nav-sticky');

        }

    }



    ////// 이전 섹션의 높이를 구하는 함수 -------------------------------------------------------------------------
    const getPrevSectionHeight = function() {

        let prevHeight = 0;

        for (let i = 0; i < currentSection; i++) {

            prevHeight = prevHeight + sectionSet[i].height;

        }
        
        return prevHeight;

    }
    
    


    ////// 애니메이션 영역을 지정하는 함수 -------------------------------------------------------------------------
    const calcValue = function(values) {

        let result = 0;     // 결과(CSS값)
        let ratio = 0;      // 비율

        // 부분 애니메이션 계산 시 사용하는 변수
        // [0, 1, {start: 0.03, end: 0.12}]
        let partStart = 0;
        let partEnd = 0;
        let partHeight = 0;
        
        // 현재 섹션의 높이
        const curHeight = sectionSet[currentSection].height;


        // [1, 0] => 이것은 [1, 0, {start: 0, end: 1}]과 같은 의미
        if (values.length === 2) {

            // 1. 비율을 구한다.
            ratio = sectionYOffset / curHeight;

            // 2. 비율에 따른 CSS값을 구한다.
            result = ((values[1] - values[0]) * ratio) + values[0];
        }
        
        // [1, 0, {start, end}]
        else if (values.length === 3) {

            partStart   = values[2].start * curHeight;
            partEnd     = values[2].end * curHeight;
            partHeight  = partEnd - partStart;
            
            if (sectionYOffset < partStart) {
    
                result = values[0];
    
            } else if (sectionYOffset > partEnd) {
    
                result = values[1];
    
            } else { // 이 두 줄이 핵심코드
    
                ratio = (sectionYOffset - partStart) / partHeight;
                result = (values[1] - values[0]) * ratio + values[0];
    
            }

        }

        return result;

    }



    ////// 섹션별로 애니메이션을 실행하는 함수 -------------------------------------------------------------------
    const playAnimation = function() {

        let opacity = 0;
        let translateY = 0;
        let scrollRate = sectionYOffset / sectionSet[currentSection].height; // 0~1 사이의 값이 나온다.

        let values = sectionSet[currentSection].vals;
        let objects = sectionSet[currentSection].objs;

        switch(currentSection) {
        // 현재 스크롤된 위치가 sec-0인지 sec-1인지

            case 0:

                // opacity = calcValue([1, 0]);
                // objects.messageA.style.opacity = opacity;
                // console.log(opacity);

                // 스크롤을 다시 올렸을 때 잔상이 남는 현상을 없애기 위해 초기화
                objects.messageA.style.opacity = 0;
                objects.messageB.style.opacity = 0;
                objects.messageC.style.opacity = 0;
                objects.messageD.style.opacity = 0;  

                
                if (scrollRate < 0.13) {

                    // fade-in 처리를 한다.
                    opacity = calcValue(values.messageA_fade_in);
                    objects.messageA.style.opacity = opacity;

                    // transY-in을 처리한다.
                    translateY = calcValue(values.messageA_transY_in);
                    objects.messageA.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.13) && (scrollRate < 0.25)) {

                    // fade-out 처리를 한다.
                    opacity = calcValue(values.messageA_fade_out);
                    objects.messageA.style.opacity = opacity;

                    // transY-out을 처리한다.
                    translateY = calcValue(values.messageA_transY_out);
                    objects.messageA.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.25) && (scrollRate < 0.38)) {

                    opacity = calcValue(values.messageB_fade_in);
                    objects.messageB.style.opacity = opacity;

                    translateY = calcValue(values.messageB_transY_in);
                    objects.messageB.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.38) && (scrollRate < 0.5)) {

                    opacity = calcValue(values.messageB_fade_out);
                    objects.messageB.style.opacity = opacity;

                    translateY = calcValue(values.messageB_transY_out);
                    objects.messageB.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.5) && (scrollRate < 0.62)) {

                    opacity = calcValue(values.messageC_fade_in);
                    objects.messageC.style.opacity = opacity;

                    translateY = calcValue(values.messageC_transY_in);
                    objects.messageC.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.62) && (scrollRate < 0.75)) {

                    opacity = calcValue(values.messageC_fade_out);
                    objects.messageC.style.opacity = opacity;

                    translateY = calcValue(values.messageC_transY_out);
                    objects.messageC.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.75) && (scrollRate < 0.87)) {

                    opacity = calcValue(values.messageD_fade_in);
                    objects.messageD.style.opacity = opacity;

                    translateY = calcValue(values.messageD_transY_in);
                    objects.messageD.style.transform = `translateY(${translateY}%)`;

                } else if ((scrollRate >= 0.87) && (scrollRate < 0.92)) {

                    opacity = calcValue(values.messageD_fade_out);
                    objects.messageD.style.opacity = opacity;

                    translateY = calcValue(values.messageD_transY_out);
                    objects.messageD.style.transform = `translateY(${translateY}%)`;

                }

                // console.log("0번 섹션의 애니메이션이 돌고 있어요.");
                break;

            case 1:
                // console.log("1번 섹션의 애니메이션이 돌고 있어요.");
                break;

            default:
                console.error("[ERROR] playAnimation()");
                break;

        }

    }




    /////// EVENT LISTENER ////////////////////////////////////////////////////////////////////////////////////




    window.addEventListener('scroll', () => {

        // 1. 스크롤 값을 설정한다.
        yOffset = window.scrollY;

        // 2. 현재 섹션값을 가지고 온다.
        currentSection = getCurrentSection();

        // 섹션별 스크롤값을 초기화해보자.
        sectionYOffset = yOffset - getPrevSectionHeight();
        // console.log("sectionYOffset = " + sectionYOffset);

        // CSS 변경..
        setBodyID(currentSection);
        setLocalnavMenu();
        // console.log(`yOffset = ${yOffset}, section = ${currentSection}`);

        // 애니메이션 실행
        playAnimation();

    });
    

    // setLayout() 호출을 위해서는 두가지 이벤트를 추가해야 한다.
    // 1. 처음 로딩될 때 setLayout()를 호출해준다.
    window.addEventListener('load', () => {
        // 1) 레이아웃을 다시 잡는다.
        setLayout();

        // 2) 스크롤 값을 다시 설정한다.
        yOffset = window.scrollY;

        // 3) 현재 섹션값을 가지고 온다.
        currentSection = getCurrentSection();
        setBodyID(currentSection);
        setLocalnavMenu();
    });

    // 2. 사이즈가 변경되면 setLayout() 다시 호출해준다.
    window.addEventListener('resize', () => {
        setLayout();
    });



})();