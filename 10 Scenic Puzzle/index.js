document.addEventListener("DOMContentLoaded", () => {
    const puzzlePieces = document.querySelectorAll(".puzzle-piece");
    const puzzleGrid = document.querySelector(".puzzle-grid");
    const progressBar = document.querySelector(".progress-bar");

    let draggedPiece = null;

    // Shuffle puzzle pieces
    function shufflePieces() {
        const positions = [];
        puzzlePieces.forEach((piece, index) => {
            const x = index % 3;
            const y = Math.floor(index / 3);
            positions.push({ x, y });
        });

        // Shuffle the positions array
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }

        // Apply shuffled positions to the pieces
        puzzlePieces.forEach((piece, index) => {
            const { x, y } = positions[index];
            piece.style.setProperty("--x", x);
            piece.style.setProperty("--y", y);
        });
    }

    // Drag start event
    puzzlePieces.forEach(piece => {
        piece.addEventListener("dragstart", (e) => {
            draggedPiece = e.target;
            setTimeout(() => {
                e.target.style.opacity = "0.5";
            }, 0);
        });

        piece.addEventListener("dragend", (e) => {
            setTimeout(() => {
                e.target.style.opacity = "1";
                draggedPiece = null;
            }, 0);
        });
    });

    // Drag over and drop events
    puzzleGrid.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    puzzleGrid.addEventListener("drop", (e) => {
        e.preventDefault();
        const target = e.target;

        // Ensure the drop target is a valid grid cell
        if (target.classList.contains("puzzle-piece") && target !== draggedPiece) {
            // Swap positions
            const draggedX = draggedPiece.style.getPropertyValue("--x");
            const draggedY = draggedPiece.style.getPropertyValue("--y");
            const targetX = target.style.getPropertyValue("--x");
            const targetY = target.style.getPropertyValue("--y");

            draggedPiece.style.setProperty("--x", targetX);
            draggedPiece.style.setProperty("--y", targetY);
            target.style.setProperty("--x", draggedX);
            target.style.setProperty("--y", draggedY);

            // Check if the puzzle is solved
            checkPuzzleCompletion();
        }
    });

    // Check if the puzzle is solved
    function checkPuzzleCompletion() {
        let isComplete = true;

        puzzlePieces.forEach(piece => {
            const x = piece.style.getPropertyValue("--x").trim();
            const y = piece.style.getPropertyValue("--y").trim();
            const correctX = piece.dataset.correctX;
            const correctY = piece.dataset.correctY;

            if (x !== correctX || y !== correctY) {
                isComplete = false;
            }
        });

        if (isComplete) {
            progressBar.style.width = "100%";
            alert("Congratulations! You solved the puzzle!");
        } else {
            const progress = calculateProgress();
            progressBar.style.width = `${progress}%`;
        }
    }

    // Calculate progress percentage
    function calculateProgress() {
        let correctPieces = 0;

        puzzlePieces.forEach(piece => {
            const x = piece.style.getPropertyValue("--x").trim();
            const y = piece.style.getPropertyValue("--y").trim();
            const correctX = piece.dataset.correctX;
            const correctY = piece.dataset.correctY;

            if (x === correctX && y === correctY) {
                correctPieces++;
            }
        });

        return (correctPieces / puzzlePieces.length) * 100;
    }

    // Initialize correct positions
    puzzlePieces.forEach((piece, index) => {
        const x = index % 3;
        const y = Math.floor(index / 3);
        piece.dataset.correctX = x;
        piece.dataset.correctY = y;
    });

    // Shuffle the pieces when the page loads
    shufflePieces();
});