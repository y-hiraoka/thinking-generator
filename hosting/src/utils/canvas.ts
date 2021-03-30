/**
 * canvasでfillTextする際に指定した幅で自動改行する関数
 * @param context CanvasRenderingContext2D
 * @param width 1行の幅
 * @param height 1行の高さ
 */
export const fillTextAutoLine = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const column = [""];
  let line = 0;
  for (var i = 0; i < text.length; i++) {
    var char = text.charAt(i);

    if (context.measureText(column[line] + char).width > width) {
      line++;
      column[line] = "";
    }
    column[line] += char;
  }

  for (var j = 0; j < column.length; j++) {
    context.fillText(column[j], x, y + height * j);
  }
};
