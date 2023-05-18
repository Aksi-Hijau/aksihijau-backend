const jwt = require('jsonwebtoken');

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAxF2AP1d67vvAamyXq3ffbJPpbbSAz+fUsSvEVVK5QmgZ5+t0
EJi8wy/kjRlW7jk+wt2eqiTiviZuOyUC0X2o7tKPTnBxhOt3zXVIQJKWPl5j2byP
kE7r4zLYTQhAmnAp3m8pyaXXicELxB9KBgAE+BFonofUcqvXOrKYYiUDTnzoV/Fo
BmIz9z8NoDp6wBVLv5P5QBKyMqOA5++0UF+914upSdc3XLlug/FW6bHHtxRbv78y
+m8kZtAHPNy+M38CtCqUTT0+iEjAAdHzvagCrYgJYsO1RxZ9ZHeiLPGLhhuaL7Dz
fAhczjO7HHFyH+pSzmt1LVmSDKQj++dV43LpCwIDAQABAoIBAQC0F7TpYwgCaq4c
bR/lSPmGkVmDHgsNoue03hkgz8/NEcDArXczSYHF2gTZS6YosiPXgH5mOZIjJwfu
ApHFJGRtNHvuSr4yU+r6algrsMVOyi71oTRh+5/oLdenPqxReBFOSdGfeRRm6MAr
zS6MtjPYd87lplm4GdY5pVaQnLWdouCUjeZWdRtamHuM7v1cS4Twjpjbz0cOdzhT
JQF7+/hBoVwXHK3LKVjKSzCUOakdGhe7Zxde5gsVcFLtbe4M4VUfTig4UTeX0GIO
SGuwqvSi8xANQJe+1ttYQbUSv+OhQ1K2y/FvNMhd1esMd9FklQb+u26NX/sB1Hw8
9LOZMjwxAoGBAPPjUZPv2Q4vWMoiAYLHmPaspM/nluXSBA6czdXaQZ0YNHWnMFzw
oqKw3+elEApvjkMC+kwhoYy47HTC/Ki5ZakNgA4MjcXQLS0T4UTAn4DSKX9ptVuT
l5rB99A3Gkro7j1Vko9ttAXgkjpodVhKx4FIAq6bGKP/rprNhxrjaYSFAoGBAM4d
//ZHZiNjc9qcIu46kRg6P4Ip/6y7rHEmhghmtd8h/hWoUlkUzkwaVQgzCDEMUzr7
p/hpYL71kqWb9A2PXQCdfreHaBjkgU7xM11jGua0jYEntTyC6/yYABMFYfILgIBS
V82Xth9t0kH0qz72SZHnKqnTwcjK3i/cXcq4mDRPAoGBAIVHBj+X5L/Rs+3SI406
UicLNY2/+0BgQoNRwVJKUWzt200oLk+72MSbb+CA3YE2cUHBkNKl1ki2jdFI9RWn
Kxz1GbOTvK4LE4T8xi/yK7gUIUVVmRwQTdrugOQyGJYzMG4oI01qH+TOUlrE1suH
IftORNjyPMbyZJKIGnrhJ7qZAoGARu74Ga90rRUa188IDmhFassQ9CC0BqQHsmEJ
m3aNfJ7cLGPjAxkv7ezZ+pplZUvSkOfuZIUPcGhe8XN8R/ZgkUeiRlLpNjfdcGd9
v9PNfDwCvsIFky+TOzisPd+KV5wxuvebk/t0B9jplR04mdB0fSvK+OsRM6LtWBdE
h/GDH+0CgYAqKFG7tyseTQic3g/s50ILy1pKfjcPb4rGRWPoWdgzN+0GFtUgkb5f
3LCKL9wI09iuj+KzIOeiEWHIaQmDes/i3zkXcGmmpLpxB1Q/zWWrkUucnpFNuVxZ
FhM2c4VgxYK8QKuHpGvHkocgP0qHNGRPgnmNf5LziBKzkhvUV/752g==
-----END RSA PRIVATE KEY-----`;

const signJwt = (object, options) => {
  return jwt.sign(object, privateKey, {
      algorithm: 'RS256',
      ...options,
  })
}

module.exports = {
  signJwt,
}