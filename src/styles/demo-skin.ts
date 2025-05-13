import { css } from "lit";

export const demoSkin = css`
    /*:host .toggle-area:before {
        background: red;
    }

    :host .toggle-area{
        background: blue;
    }*/

	    .sub-content {
            overflow-x: hidden;
			min-width: 400px;
        }

/* FLEXBOX grid system SMT - based on 20 cols/steps - supports only new flexbox syntax*/
.frow {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

.fcol {
	flex: 1;
	box-sizing: border-box;
}
/*other adjustments - all must be set on the flex container*/
.gutters .fcol {
	padding: 1rem;
}

	.gutters .fcol.frow {
		padding: 0;
	}

.frow-start {
	justify-content: flex-start;
}

.frow-center {
	justify-content: center;
}

.frow-end {
	justify-content: flex-end;
}

.frow-top {
	align-items: flex-start;
}

.frow-middle {
	align-items: center;
}

.frow-bottom {
	align-items: flex-end;
}

.frow-around {
	justify-content: space-around;
}

.frow-between {
	justify-content: space-between;
}

.fcol-first {
	order: -1;
}

.fcol-last {
	order: 1;
}

.txt-singleline {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

/*screen- breakpoint for smallest devices = most cases - phone portrait*/
@media only screen and (max-width: 320px) {
	.fcol {
		flex-basis: 100%;
	}
}


/*extreme xs = "xxs" - this disable single line rearrangement for smallest devices*/
@media only screen and (min-width: 1px) {
	.xxs-c1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
	.xxs-c2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
	.xxs-c3 { flex: 0 0 25%; max-width: 25%; }
	.xxs-c4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
	.xxs-c5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
	.xxs-c6 { flex: 0 0 50%; max-width: 50%; }
	.xxs-c7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
	.xxs-c8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
	.xxs-c9 { flex: 0 0 75%; max-width: 75%; }
	.xxs-c10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
	.xxs-c11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
	.xxs-c12 { flex: 0 0 100%; max-width: 100%; }
}


/*screen-extra-small = xs*/
@media only screen and (min-width: 321px) {
	.xxs-c1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
	.xxs-c2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
	.xxs-c3 { flex: 0 0 25%; max-width: 25%; }
	.xxs-c4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
	.xxs-c5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
	.xxs-c6 { flex: 0 0 50%; max-width: 50%; }
	.xxs-c7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
	.xxs-c8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
	.xxs-c9 { flex: 0 0 75%; max-width: 75%; }
	.xxs-c10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
	.xxs-c11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
	.xxs-c12 { flex: 0 0 100%; max-width: 100%; }
}

/*screen-small = sm*/
@media only screen and (min-width: 481px) {
	.xxs-c1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
	.xxs-c2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
	.xxs-c3 { flex: 0 0 25%; max-width: 25%; }
	.xxs-c4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
	.xxs-c5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
	.xxs-c6 { flex: 0 0 50%; max-width: 50%; }
	.xxs-c7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
	.xxs-c8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
	.xxs-c9 { flex: 0 0 75%; max-width: 75%; }
	.xxs-c10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
	.xxs-c11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
	.xxs-c12 { flex: 0 0 100%; max-width: 100%; }
}

/*screen-medium = md*/
@media only screen and (min-width : 768px) {
	.mid-c1 { flex: 0 0 8.333333%; max-width: 8.333333%;}
	.mid-c2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
	.mid-c3 { flex: 0 0 25%; max-width: 25%; }
	.mid-c4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
	.mid-c5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
	.mid-c6 { flex: 0 0 50%; max-width: 50%; }
	.mid-c7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
	.mid-c8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
	.mid-c9 { flex: 0 0 75%; max-width: 75%; }
	.mid-c10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
	.mid-c11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
	.mid-c12 { flex: 0 0 100%; max-width: 100%; }
	}

/*screen-large = lg*/
@media only screen and (min-width : 1244px) {
	.lg-c1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
	.lg-c2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
	.lg-c3 { flex: 0 0 25%; max-width: 25%; }
	.lg-c4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
	.lg-c5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
	.lg-c6 { flex: 0 0 50%; max-width: 50%; }
	.lg-c7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
	.lg-c8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
	.lg-c9 { flex: 0 0 75%; max-width: 75%; }
	.lg-c10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
	.lg-c11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
	.lg-c12 { flex: 0 0 100%; max-width: 100%; }
	}

	:host(grid-context.mobile) {
		display: flex;
		width: 100px;
		height: 100%;
		left: 100%;
		background: #ccc;
	}

	:host(grid-context.mobile) ctrl-button {
		font-size: 16px;
		padding: 0 8px;
	}

	t-row.has-context {
		transition: all 300ms ease-in-out;
	}

	t-row.has-context.toggle {
		transform: translate(-100px,0);
	}
`;
