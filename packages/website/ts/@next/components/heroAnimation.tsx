import * as React from 'react';
import styled, { keyframes } from 'styled-components';

export const HeroAnimation = () => (
    <Image width="404" height="404" viewBox="0 0 404 404" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="404" height="404">
            <circle cx="202" cy="202" r="200" fill="#00AE99" stroke="#00AE99" stroke-width="3" />
        </mask>
        <g mask="url(#mask0)">
            <circle cx="202" cy="202" r="200" stroke="#00AE99" strokeWidth="3" />
            <TopCircle
                vector-effect="non-scaling-stroke"
                cx="201.667"
                cy="68.6667"
                r="66.6667"
                stroke="#00AE99"
                strokeWidth="3"
            />
            <LeftCircle
                vector-effect="non-scaling-stroke"
                cx="68.6667"
                cy="202.667"
                r="66.6667"
                stroke="#00AE99"
                strokeWidth="3"
            />
            <Logo
                vector-effect="non-scaling-stroke"
                d="M168.17 260.29L167.271 259.089L165.46 260.444L167.413 261.585L168.17 260.29ZM197.32 269.2L197.219 270.696L197.226 270.697L197.32 269.2ZM237.414 258.856L238.22 260.12L238.225 260.117L237.414 258.856ZM252.653 245.439L253.801 246.405L254.55 245.515L253.874 244.568L252.653 245.439ZM241.096 229.872L242.285 228.958L242.281 228.952L242.276 228.946L241.096 229.872ZM237.72 225.571L238.901 224.645L237.582 222.965L236.449 224.775L237.72 225.571ZM219.719 241.445L218.672 242.519L219.418 243.246L220.36 242.801L219.719 241.445ZM208.264 230.282L209.311 229.207L208.392 228.312L207.365 229.081L208.264 230.282ZM143.827 169.549L145.02 168.64L143.647 166.838L142.524 168.806L143.827 169.549ZM135.133 198.43L133.637 198.329L133.636 198.337L135.133 198.43ZM145.464 238.577L144.201 239.388L145.464 238.577ZM158.862 253.837L157.895 254.984L158.786 255.736L159.735 255.057L158.862 253.837ZM174.409 242.264L175.324 243.453L175.33 243.448L175.336 243.443L174.409 242.264ZM178.705 238.885L179.632 240.064L181.287 238.761L179.516 237.623L178.705 238.885ZM162.851 220.757L161.78 219.707L161.049 220.452L161.495 221.397L162.851 220.757ZM174.102 209.286L175.173 210.337L176.082 209.41L175.295 208.377L174.102 209.286ZM235.163 145.072L236.036 146.292L237.92 144.945L235.92 143.777L235.163 145.072ZM206.014 136.162L205.91 137.658L205.913 137.658L206.014 136.162ZM165.817 146.506L166.629 147.767L166.632 147.765L165.817 146.506ZM150.578 159.922L149.43 158.956L148.681 159.846L149.357 160.793L150.578 159.922ZM162.135 175.489L160.946 176.403L160.951 176.409L160.955 176.415L162.135 175.489ZM165.511 179.791L164.331 180.717L165.634 182.378L166.773 180.6L165.511 179.791ZM183.614 163.916L184.655 162.836L183.913 162.122L182.98 162.557L183.614 163.916ZM194.354 174.26L193.313 175.341L194.212 176.206L195.226 175.48L194.354 174.26ZM259.608 235.505L258.411 236.409L259.789 238.233L260.914 236.243L259.608 235.505ZM268.2 206.931L269.696 207.033L269.697 207.024L268.2 206.931ZM257.87 166.784L259.135 165.979L259.132 165.974L257.87 166.784ZM244.471 151.524L245.439 150.378L244.547 149.625L243.598 150.304L244.471 151.524ZM228.924 163.097L228.009 161.909L228.003 161.913L227.997 161.918L228.924 163.097ZM224.629 166.477L223.701 165.298L222.034 166.609L223.826 167.744L224.629 166.477ZM240.584 184.604L239.228 185.244L239.235 185.259L239.242 185.274L240.584 184.604ZM240.687 184.809L241.767 185.849L242.502 185.086L242.029 184.139L240.687 184.809ZM229.845 196.075L228.764 195.035L227.877 195.957L228.648 196.979L229.845 196.075ZM167.413 261.585C176.201 266.718 186.346 269.964 197.219 270.696L197.421 267.703C187.019 267.002 177.321 263.898 168.926 258.994L167.413 261.585ZM197.226 270.697C212.283 271.639 226.405 267.659 238.22 260.12L236.607 257.591C225.307 264.8 211.813 268.604 197.413 267.703L197.226 270.697ZM238.225 260.117C244.08 256.348 249.307 251.742 253.801 246.405L251.506 244.473C247.204 249.583 242.203 253.989 236.602 257.594L238.225 260.117ZM253.874 244.568C250.283 239.533 246.385 234.295 242.285 228.958L239.906 230.786C243.989 236.1 247.864 241.309 251.432 246.31L253.874 244.568ZM242.276 228.946C241.713 228.229 241.151 227.512 240.588 226.795C240.026 226.078 239.463 225.362 238.901 224.645L236.54 226.497C237.103 227.213 237.665 227.93 238.228 228.647C238.791 229.364 239.353 230.081 239.916 230.798L242.276 228.946ZM236.449 224.775C232.311 231.384 226.193 236.725 219.078 240.089L220.36 242.801C227.974 239.201 234.538 233.481 238.992 226.367L236.449 224.775ZM220.766 240.371L209.311 229.207L207.217 231.356L218.672 242.519L220.766 240.371ZM207.365 229.081L167.271 259.089L169.069 261.49L209.163 231.483L207.365 229.081ZM142.524 168.806C137.505 177.601 134.368 187.549 133.637 198.329L136.63 198.532C137.33 188.214 140.33 178.703 145.13 170.293L142.524 168.806ZM133.636 198.337C132.696 213.409 136.668 227.654 144.201 239.388L146.726 237.767C139.531 226.56 135.73 212.947 136.63 198.524L133.636 198.337ZM144.201 239.388C147.965 245.25 152.565 250.484 157.895 254.984L159.83 252.691C154.727 248.383 150.327 243.376 146.726 237.767L144.201 239.388ZM159.735 255.057C164.764 251.461 169.994 247.558 175.324 243.453L173.494 241.076C168.187 245.164 162.985 249.045 157.99 252.617L159.735 255.057ZM175.336 243.443C176.768 242.317 178.2 241.19 179.632 240.064L177.777 237.706C176.345 238.832 174.913 239.959 173.481 241.086L175.336 243.443ZM179.516 237.623C172.904 233.374 167.568 227.241 164.208 220.117L161.495 221.397C165.09 229.021 170.8 235.588 177.894 240.147L179.516 237.623ZM163.922 221.807L175.173 210.337L173.031 208.236L161.78 219.707L163.922 221.807ZM175.295 208.377L145.02 168.64L142.634 170.458L172.909 210.196L175.295 208.377ZM235.92 143.777C227.132 138.643 216.987 135.398 206.114 134.665L205.913 137.658C216.315 138.359 226.012 141.463 234.407 146.367L235.92 143.777ZM206.118 134.665C191.055 133.618 176.824 137.599 165.003 145.246L166.632 147.765C177.926 140.459 191.515 136.657 205.91 137.658L206.118 134.665ZM165.006 145.244C159.151 149.013 153.924 153.619 149.43 158.956L151.725 160.888C156.027 155.779 161.028 151.372 166.629 147.767L165.006 145.244ZM149.357 160.793C152.948 165.828 156.846 171.066 160.946 176.403L163.325 174.575C159.242 169.261 155.367 164.052 151.799 159.051L149.357 160.793ZM160.955 176.415C161.518 177.132 162.08 177.849 162.643 178.566C163.205 179.283 163.768 180 164.331 180.717L166.691 178.865C166.128 178.148 165.566 177.431 165.003 176.714C164.441 175.997 163.878 175.28 163.315 174.563L160.955 176.415ZM166.773 180.6C171.021 173.973 177.044 168.635 184.248 165.276L182.98 162.557C175.251 166.161 168.796 171.885 164.248 178.981L166.773 180.6ZM182.574 164.997L193.313 175.341L195.394 173.18L184.655 162.836L182.574 164.997ZM195.226 175.48L236.036 146.292L234.291 143.852L193.481 173.04L195.226 175.48ZM260.914 236.243C265.827 227.556 268.964 217.713 269.696 207.033L266.703 206.828C266.003 217.042 263.004 226.453 258.303 234.767L260.914 236.243ZM269.697 207.024C270.638 191.949 266.663 177.81 259.135 165.979L256.604 167.589C263.804 178.904 267.603 192.417 266.703 206.837L269.697 207.024ZM259.132 165.974C255.368 160.111 250.769 154.878 245.439 150.378L243.503 152.67C248.606 156.978 253.007 161.986 256.607 167.594L259.132 165.974ZM243.598 150.304C238.57 153.901 233.339 157.803 228.009 161.909L229.84 164.285C235.147 160.197 240.349 156.316 245.344 152.744L243.598 150.304ZM227.997 161.918C227.281 162.481 226.565 163.045 225.849 163.608C225.133 164.171 224.417 164.734 223.701 165.298L225.556 167.656C226.272 167.092 226.988 166.529 227.704 165.966C228.42 165.402 229.136 164.839 229.852 164.276L227.997 161.918ZM223.826 167.744C230.535 171.992 235.869 178.121 239.228 185.244L241.941 183.964C238.345 176.339 232.632 169.769 225.431 165.209L223.826 167.744ZM239.242 185.274L239.345 185.479L242.029 184.139L241.926 183.934L239.242 185.274ZM239.606 183.769L228.764 195.035L230.926 197.115L241.767 185.849L239.606 183.769ZM228.648 196.979L258.411 236.409L260.806 234.601L231.042 195.171L228.648 196.979Z"
                fill="#00AE99"
            />
            <Rectangle
                vector-effect="non-scaling-stroke"
                d="M269 135V268.333H442V135H269Z"
                stroke="#00AE99"
                strokeWidth="3"
            />
            <Square
                vector-effect="non-scaling-stroke"
                d="M339.64 269.64L270 339.281L343.913 413.194L413.554 343.554L339.64 269.64Z"
                stroke="#00AE99"
                strokeWidth="3"
            />
            <Oblong
                vector-effect="non-scaling-stroke"
                d="M202.5 269C202.5 269 269 269 269 335.5C269 402 202.5 402 202.5 402H-6.5C-6.5 402 -77 402 -77 335.5C-77 269 -6.5 269 -6.5 269H202.5Z"
                stroke="#00AE99"
                strokeWidth="3"
            />
        </g>
    </Image>
);

const moveUp = keyframes`
    0% { transform: translate3d(0, 0, 0) }
    45% { transform: translate3d(0, 0, 0) }
    55% { transform: translate3d(0, -7%, 0) }
    85% { transform: translate3d(0, -7%, 0) }
    100% { transform: translate3d(0, 0, 0) }
`;

const moveLeft = keyframes`
    0% { transform: translate3d(0, 0, 0) }
    45% { transform: translate3d(0, 0, 0) }
    55% { transform: translate3d(-7%, 0, 0) }
    85% { transform: translate3d(-7%, 0, 0) }
    100% { transform: translate3d(0, 0, 0) }
`;

const moveDiag = keyframes`
    0% { transform: translate3d(0, 0, 0) }
    45% { transform: translate3d(0, 0, 0) }
    55% { transform: translate3d(5%, 5%, 0) }
    85% { transform: translate3d(5%, 5%, 0) }
    100% { transform: translate3d(0, 0, 0) }
`;

const moveRight = keyframes`
    0% { transform: translate3d(0, 0, 0) }
    45% { transform: translate3d(0, 0, 0) }
    55% { transform: translate3d(7%, 0, 0) }
    85% { transform: translate3d(7%, 0, 0) }
    100% { transform: translate3d(0, 0, 0) }
`;

const spin = keyframes`
    0% { transform: rotate(0deg) }
    65% { transform: rotate(0deg) }
    85% { transform: rotate(90deg) }
    100% { transform: rotate(90deg) }
`;

const moveIn = keyframes`
    0% { opacity: 0; transform: scale(1.7) rotate(-30deg) }
    100% { opacity: 1; transform: scale(1)  rotate(0deg) }
`;

const Image = styled.svg`
    opacity: 0;
    transform: scale(1.5) rotate(-30deg);
    animation: ${moveIn} 2s forwards;
`;

const TopCircle = styled.circle`
    animation: ${moveUp} 4s -2.85s infinite;
`;
const LeftCircle = styled.circle`
    animation: ${moveLeft} 4s -2.85s infinite;
`;
const Oblong = styled.path`
    animation: ${moveLeft} 4s -2.85s infinite;
`;
const Square = styled.path`
    animation: ${moveDiag} 4s -2.85s infinite;
`;
const Rectangle = styled.path`
    animation: ${moveRight} 4s -2.85s infinite;
`;

const Logo = styled.path`
    animation: ${spin} 4s -2.8s infinite;
    transform-origin: 202px 202.7px;
`;
