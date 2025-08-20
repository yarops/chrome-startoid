// Chrome API типы для расширений
declare namespace chrome {
    namespace identity {
        interface UserInfo {
            email: string;
            id: string;
        }

        function getProfileUserInfo(
            callback: (userInfo: UserInfo) => void
        ): void;

        function getProfileUserInfo(
            details: { accountStatus?: string },
            callback: (userInfo: UserInfo) => void
        ): void;
    }

    namespace storage {
        namespace local {
            function get(
                keys: string | string[] | { [key: string]: any } | null,
                callback: (items: { [key: string]: any }) => void
            ): void;

            function set(
                items: { [key: string]: any },
                callback?: () => void
            ): void;
        }
    }
}

// Глобальная декларация Chrome
declare const chrome: typeof chrome;