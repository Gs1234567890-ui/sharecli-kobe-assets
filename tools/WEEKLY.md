# 毎週の分析・改善 手順書（シェアクリ神戸）

## 絶対ルール（オーナー・本部の指定）
- 診療方法は必ず「ビデオ通話」、受付は「20時まで」（10:00〜20:00）で統一。
- 使う文言：「初めてでも安心」「LINEで完結」。本部の文言・画像の流用OK。
- GLP-1の投稿も含める（キャプションに未承認医薬品の説明 GLP2 を必ず付ける＝plan.js の glp:true）。
- キャラクターは「シバ先生」（黒柴の医師・手描きイラスト風）。tools/char の画像のみ使用。
- リール右上に「PR」バッジは入れない（下部のPR注記は残す）。
- 作成後は「誤字脱字がないか」「文字が他の素材と被っていないか」を3回チェック：
  1) `python3 tools/render.py check <日付…>` が TOTAL 0
  2) `python3 tools/render.py sheets <日付…>` の一覧画像を目で確認
  3) キャプション・画像内テキストの校正（誤字、ルール違反ワード、ハッシュタグ30個以内）
- 医療広告として誇大・断定表現（「必ず痩せる」「絶対治る」等）、ビフォーアフター、体験談は使わない。

## 構成
- tools/plan.js の `P` 配列が投稿計画。1日1件：d(MM/DD) w c t car glp hook sub hd p[] q cta slides[] st cap。
  car:true の日はカルーセル（slides 必須）。tools/tpl2.js の改行マップ(HB/SB等)に無い長文は改行崩れに注意。
- `python3 tools/render.py build <日付…>` で reels/MMDD.mp4・carousel/MMDD_n.jpg・stories/MMDD.jpg を生成。
- `python3 tools/render.py captions` で captions.json を再生成（毎日の自動投稿はこれを読む）。
- 毎日21:07の自動投稿は captions.json と reels/・carousel/ を GitHub Pages から読む。

## キャプションの型（2026-11-16 オーナー承認）
- cap は「タイトル行 → 場面の一言（例：「仕事中、気づくとあごを触ってる」）→ 本文（チェック・Q&A等）→ 安心材料（ビデオ通話・受付20時まで・スマホだけ 等の具体情報）→ 3ステップ行 → コメント誘導」の順。
- 3ステップ行は固定：「📱 LINEで予約 → ビデオ通話で医師が診察 → 必要な方にはお薬をご自宅へ」
- GLP-1の日は薬をすすめる言い回し（「〜をご提案」「痩せやすくなる」等）を使わず、「合う方法かは医師が判断」とする。実績数・効果の数字は根拠がない限り入れない。

## BGM（2026-11-18 オーナー希望：フリーBGMサイトの曲を使う）
- 使用曲はオーナー指定の「Morning_2」（DOVA-SYNDROME）1曲のみ。毎回この曲を使う。
- mp3 単体の公開は規約違反になるのでリポジトリに入れない（.gitignore 済み）。tools/bgm が空のときは reels/_bgm_ref.mp4 の音声が自動で使われるので、build だけでBGM入りになる。
- tools/bgm/ に置いた曲（DOVA-SYNDROME など商用利用OK・各曲の個別規約も確認済みのもの）が build 時に自動でリールに入る（日付でローテーション、plan.js の bgm:"ファイル名" で指定も可）。
- 既存リールに入れ直すとき：`python3 tools/render.py bgm <日付…>`。
- 「作業用BGM」的に音楽が主役になる使い方はしない（DOVA規約）。曲の追加はオーナーが選んだものだけ。

## リールのカバー画像（2026-11-18 追加）
- build 時に covers/MMDD.jpg（1080×1920、tpl2.js の cover2HTML）が自動で作られる。単体で作るときは `python3 tools/render.py covers <日付…>`。
- 文字・キャラはグリッド表示の3:4範囲（y240〜1680）に収める。check に COVER も含まれる。
- 毎日の自動投稿は covers/MMDD.jpg があれば cover_url に指定する。
