export default function ContainsSpecialCharacter(input) {
	// 정규 표현식을 사용하여 특수 문자 찾기
	let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

	return specialCharacters.test(input);
}
