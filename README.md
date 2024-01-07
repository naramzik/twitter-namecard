# application

명함 공유 어플리케이션

## Commit convention

- feat: 새로운 기능
- fix: 버그 / 이슈 수정
- docs: 문서만 변경하는 경우
- style: 코드의 로직을 변경하지 않는 코드의 수정사항 (공백, 포맷팅, 세미콜론 추가, 등등)
- refactor: 버그 또는 기능 추가가 아닌 코드의 수정사항
- perf: 코드의 성능을 개선하는 수정사항
- test: 새롭게 테스트를 추가하거나 변경
- chore: 패키지 매니저 수정, 설정 파일 수정과 같이 설정과 관련된 수정사항

### Example

```bash
# 전역에 새로운 기능을 추가한 경우
$ git commit -m 'feat(application): 새로운 기능 추가'

# 특정 앱에 라이브러리를 추가한 경우
$ git commit -m 'chore(some-app): jotai 라이브러리를 추가'
```
