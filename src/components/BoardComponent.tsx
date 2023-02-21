import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';
import LostFigures from './LostFigures';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
        } else {
            if(cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell)
            }
            
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])
    

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h2 className="player">
                Player 1
            </h2>
            <LostFigures
                title='Black figures'
                figures={board.lostBlack}
            />
            <div className="board">
                {board.cells.map((row, index) => 
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
            <h2 className="player">
                Player 2
            </h2>
            <LostFigures
                title='White figures'
                figures={board.lostWhite}
            />
        </div>
    )
}

export default BoardComponent
