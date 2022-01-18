
## wantedPreOnBoarding 선발과제

배포 링크 : https://fervent-boyd-e4b28a.netlify.app/

---


### 캐러셀 동작원리

![carousel drawio](https://user-images.githubusercontent.com/34260967/149989159-f6a3c9da-770d-44d6-aca5-2d5f39585882.png)


<오른쪽 버튼 클릭 시>
1. carousel-wrapper 가 통째로 왼쪽으로 이동.
2. 이동 후 index 계산.
3. 계산된 index를 기준으로 이미지 src 다시 적용
4. carousel-wrapper 원위치.



### useEffect cleanup function error
>The ref value sliderRef.current will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy sliderRef.current to a variable inside the effect, and use that variable in the cleanup function. (react-hooks/exhaustive-deps)

해결 : useEffect 내 변수를 사용하여 해결

참고 : https://stackoverflow.com/questions/67069827/cleanup-ref-issues-in-react
### build failed 문제

>TypeError: MiniCssExtractPlugin is not a constructor
>>at module.exports (C:\Users\qhtjd\react\wanted\wanted_pre_onboarding\node_modules\react-scripts\config\webpack.config.js:664:9)
at Object.<anonymous> (C:\Users\qhtjd\react\wanted\wanted_pre_onboarding\node_modules\react-scripts\scripts\build.js:58:16)
at Module._compile (internal/modules/cjs/loader.js:1072:14)
at Object.Module._extensions..js (internal/modules/cjs/loader.js:1101:10)
at Module.load (internal/modules/cjs/loader.js:937:32)
at Function.Module._load (internal/modules/cjs/loader.js:778:12)
at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)     
at internal/main/run_main_module.js:17:47

해결 : mini-css-extract-plugin 2.5.0v을 2.4.5v 로 다운그레이드 하여 해결.

참고 : https://github.com/facebook/create-react-app/issues/11930#issuecomment-1013494785