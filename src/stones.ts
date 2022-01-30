import { Canvas2DUtility } from "./canvas2d"

export class Stones {
    util: Canvas2DUtility;
    //石の状態(黒(1) | 白(-1) | 無し(0))
    stone: Array<Array<number>>;
    stone_num: number;

    //石のpixelサイズ(半径)
    stone_radius: number;
    //1マスのpixelサイズ
    grid_size: number;

    constructor(util: Canvas2DUtility, stone_num: number, grid_size: number) {
        this.util = util;
        //盤面に石が無い状態で初期化
        //stone[y][x]
        this.stone = Array.from(new Array(stone_num), () => new Array(stone_num).fill(0));
        //真ん中の4つに石を配置
        this.stone[3][3] = 1;
        this.stone[3][4] = -1;
        this.stone[4][3] = -1;
        this.stone[4][4] = 1;

        this.stone_num = stone_num;
        this.grid_size = grid_size;
        //直径はマス目の80%の大きさとする
        this.stone_radius = grid_size * 0.8 * 0.5;
    }
    update() {
        this.draw();
    }

    draw() {
        for (let y = 0; y < this.stone_num; ++y) {
            for (let x = 0; x < this.stone_num; ++x) {
                this.draw_stone(x, y, this.stone[y][x]);
            }
        }
    }

    //指定されたマス目の石を描画
    draw_stone(x: number, y: number, status: number) {
        //石が置かれていなければ何もしない
        if (status == 0) return;

        let color = status > 0 ? "black" : "white";
        this.util.drawCircle((0.5 + x) * this.grid_size, (0.5 + y) * this.grid_size, this.stone_radius, color);
    }
}
