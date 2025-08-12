import { cn } from '@/lib/utils';

interface AppLogoProps {
    className?: string;
}

export default function AppLogo({ className }: AppLogoProps) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm">
                A
            </div>
            <span className="mb-0.5 truncate leading-tight font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Akayacraft</span>
        </div>
    );
}
