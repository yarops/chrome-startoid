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

    // Minimal subset of chrome.management we need
    namespace management {
        type ExtensionType =
            | 'extension'
            | 'theme'
            | 'packaged_app'
            | 'hosted_app'
            | 'legacy_packaged_app';

        interface IconInfo {
            size: number;
            url: string;
        }

        interface ExtensionInfo {
            id: string;
            name: string;
            description?: string;
            enabled: boolean;
            type: ExtensionType;
            icons?: IconInfo[];
            appLaunchUrl?: string; // for hosted apps
            homepageUrl?: string;
            optionsUrl?: string;
        }

        function getAll(callback: (results: ExtensionInfo[]) => void): void;
        function launchApp(id: string, callback?: () => void): void;
    }

    // Minimal topSites API
    namespace topSites {
        interface MostVisitedURL {
            url: string;
            title: string;
        }
        function get(callback: (data: MostVisitedURL[]) => void): void;
    }
}

// Глобальная декларация Chrome
declare const chrome: typeof chrome;