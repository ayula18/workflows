import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface ChatFloatingButtonProps {
    onClick: () => void;
}

export default memo(function ChatFloatingButton({ onClick }: ChatFloatingButtonProps) {
    return (
        <motion.button
            key="chat-toggle"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={onClick}
            aria-label="Open chat"
            className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full shadow-lg cursor-pointer focus:outline-none"
            style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
            }}
        >
            <MessageCircle className="h-6 w-6 text-[var(--background)]" />

            {/* pulse ring */}
            <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                }}
            />
        </motion.button>
    );
});
