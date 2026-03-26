import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToHash = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hash, pathname, state } = location;

    useEffect(() => {
        // Resolve target ID from direct hash OR React Router state OR sessionStorage
        const sessionTarget = sessionStorage.getItem("scrollToTarget");
        const targetId = hash || (state?.target ? `#${state.target}` : null) || (sessionTarget ? `#${sessionTarget}` : null);

        if (targetId) {
            const tryScroll = (attempts = 0) => {
                const el = document.querySelector(targetId);
                if (el) {
                    setTimeout(() => {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        
                        // Clear the state target so F5/Refresh doesn't trigger scroll again
                        if (state?.target) {
                            const newState = { ...state };
                            delete newState.target;
                            navigate(pathname, { replace: true, state: Object.keys(newState).length ? newState : null, hash: "" });
                        }
                        
                        // Consume and destroy sessionStorage target
                        if (sessionTarget) {
                            sessionStorage.removeItem("scrollToTarget");
                        }
                        
                        // Destroy URL hash without page reload
                        if (hash) {
                            window.history.replaceState(null, "", pathname);
                        }
                    }, 100);
                } else if (attempts < 10) {
                    // Retry every 200ms up to 2 seconds for async data loading elements
                    setTimeout(() => tryScroll(attempts + 1), 200);
                }
            };
            tryScroll();
        }
    }, [hash, pathname, state, navigate]);

    return null;
};

export default ScrollToHash;
