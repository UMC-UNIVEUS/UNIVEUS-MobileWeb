import { useGoogleLogin } from "@react-oauth/google";

const TestPage = () => {

    const googleSocialLogin = useGoogleLogin({
        onSuccess: (codeResponse) => console.log(codeResponse),
        flow: 'auth-code',
    });

    return (
        <div>
            <button onClick={googleSocialLogin}>
                테스트 버튼
            </button>
        </div>
    );
}

export default TestPage;