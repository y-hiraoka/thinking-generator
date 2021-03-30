import React from "react";

interface Props {
  id?: string;
  className?: string;
  width: number;
  height: number;
  updateCanvas: (context: CanvasRenderingContext2D) => void;
}

export class CanvasComponent extends React.Component<Props> {
  canvas: HTMLCanvasElement | null = null;

  componentDidMount() {
    this.updateCanvas();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props !== nextProps) {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    if (!this.canvas) return;

    const context = this.canvas.getContext("2d");
    if (!context) return;

    this.props.updateCanvas(context);
  }

  render() {
    return (
      <canvas
        id={this.props.id}
        className={this.props.className}
        ref={e => {
          this.canvas = e;
        }}
        width={this.props.width}
        height={this.props.height}>
        Your browser does not support Canvas.
      </canvas>
    );
  }
}
