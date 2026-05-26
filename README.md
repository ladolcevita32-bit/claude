# Inspector_Agent

박현우 (Ethan Park) **선박 검사관 활동의 AI 자동화 워크스페이스**.

이전 이름: `antigravity` (2026-05-02 이름 변경, Track B/E 정체성 명확화).

---

## Scope

박현우의 다양한 선박 검사 활동을 AI로 자동화하는 도구 집합:

- **S&P (Sale & Purchase) inspection** ← 현재 Active
- 써드파티 검사 (third-party inspection)
- Condition assessment (CA)
- 조선소 품질 검사 (shipyard quality)
- 바이어사이드 condition 검사 (buyer-side condition)

---

## 현재 상태 (2026-05-02)

| 폴더 | 상태 | 비고 |
|---|---|---|
| `S&P INSPECTION 보고서/` | ✅ **Active** | SUN OCEAN PoC 완료 (PDF 34.8MB, 2026-04-21). Phase 3B (CLI multi-vessel) |
| `src/`, `public/` (Next.js) | 💤 Dormant | Todo prototype, 2026-03-15 정지 — 폐기·분리 결정 별도 라운드 |
| `claude-code-best-practice-main/` | 📚 Reference | Claude Code 학습 자료 (34MB) — 별도 reference 폴더 분리 검토 |
| `skills/` | ❓ 0B | 빈 폴더 — 정리 결정 별도 |

---

## 새 검사 유형 추가 (Just-in-time)

새 case 들어올 때 그 폴더 1개만 추가:

```
Inspector_Agent/
  ├── S&P INSPECTION 보고서/          ← 기존 (Active)
  ├── third_party/                   ← 첫 case 들어올 때 prep
  ├── condition_assessment/           ← 첫 case 들어올 때 prep
  ├── shipyard_quality/              ← 첫 case 들어올 때 prep
  └── buyer_side_condition/          ← 첫 case 들어올 때 prep
```

⛔ **미리 빈 폴더 5개 build X** (over-engineering 회피, Pair Round 18 critique 준수).

---

## 주요 명령

S&P inspection 보고서 생성 (다음 vessel):

```bash
cd "Inspector_Agent/S&P INSPECTION 보고서"
python generate_report.py --vessel <NEW_VESSEL>
```

입력 구조:
```
02_Input/<VESSEL>/vessel_config.yaml
02_Input/<VESSEL>/Inspection_Checklist.xlsx
03_Photos/<VESSEL>/<NN_Section>/selected/*.jpg
```

출력:
```
06_Output/<VESSEL>_Inspection_Report.docx
```

---

## Track 정렬

- **Track B**: 박현우 S&P 선박 검사관 사업 (개인 활동)
- **Track E**: VAST 친환경 선박 검사 SaaS — first MVP 자산 (90일 동결, 인지·재사용만)
- **세종 도메인 등록**: `inspection_report` (`~/Documents/세종/01_Domains/inspection_report.yaml`)

---

## 박제된 결정

| 날짜 | 결정 |
|---|---|
| 2026-04-17 | antigravity 폴더에 S&P generator 부활 (`generate_report.py` 주석: "Restarted by Antigravity - 2026-04-17") |
| 2026-04-21 | SUN OCEAN inspection PDF 산출 (34.8MB) — Track B/E first paying-customer-grade output |
| 2026-05-02 | 폴더 이름 antigravity → Inspector_Agent (정체성 명확화) |

---

## 회피영역 (Pair Round 18 박제)

- ❌ 빈 폴더 5개 build (5개 검사 유형 미리 prep)
- ❌ shared/ 리팩터링 (case 1개만 active 상태에서 over-engineering)
- ❌ VAST 외부 cold sales (90일 동결 정책)
- ❌ 새 sub-agent·새 skill 추가
