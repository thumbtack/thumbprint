import isThumbtackUrl from './is-thumbtack-url';

describe('isThumbtackUrl', (): void => {
    test('should return true for URLs with a thumbtack.com domain or subdomain', (): void => {
        expect(isThumbtackUrl('//thumbtack.com/foo')).toEqual(true);
        expect(isThumbtackUrl('//foo.thumbtack.com/foo')).toEqual(true);
        expect(isThumbtackUrl('//foo.bar-9.thumbtack.com/foo')).toEqual(true);

        expect(isThumbtackUrl('http://thumbtack.com/foo')).toEqual(true);
        expect(isThumbtackUrl('http://foo.thumbtack.com/foo')).toEqual(true);
        expect(isThumbtackUrl('http://foo.bar-9.thumbtack.com/foo')).toEqual(true);

        expect(isThumbtackUrl('https://thumbtack.com/foo')).toEqual(true);
        expect(isThumbtackUrl('https://foo.thumbtack.com/foo')).toEqual(true);
        expect(isThumbtackUrl('https://foo.bar-9.thumbtack.com/foo')).toEqual(true);
    });

    test('should return true for root-relative URLs', (): void => {
        expect(isThumbtackUrl('/foo')).toEqual(true);
        expect(isThumbtackUrl('/foo#bar')).toEqual(true);
    });

    test('should return true for in-page (hash) URLs', (): void => {
        expect(isThumbtackUrl('#foo')).toEqual(true);
    });

    test('should return false even when "thumbtack.com" appears somewhere else in the URL', (): void => {
        expect(isThumbtackUrl('http://example.com/foo?bar=thumbtack.com')).toEqual(false);
        expect(isThumbtackUrl('http://example.com/thumbtack.com')).toEqual(false);
    });

    test('should return false for non thumbtack.com domains', (): void => {
        expect(isThumbtackUrl('http://example.com/foo')).toEqual(false);
    });

    test('should return false when "thumbtack.com" appears as a subdomain', (): void => {
        expect(isThumbtackUrl('http://thumbtack.com.example.com/foo')).toEqual(false);
    });

    test('should return false for non-string values', (): void => {
        expect(isThumbtackUrl(undefined)).toEqual(false);
    });
});
