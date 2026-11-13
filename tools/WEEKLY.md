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
