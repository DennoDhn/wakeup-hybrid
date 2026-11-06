"""Dependency-free PNG CRC / decompression and static asset checks."""
import struct, zlib, pathlib, json, re
root=pathlib.Path(__file__).resolve().parent.parent
for size in (192,512):
 data=(root/f'icon-{size}.png').read_bytes()
 assert data[:8]==b'\x89PNG\r\n\x1a\n'
 pos=8; compressed=b''; ended=False
 while pos<len(data):
  length=struct.unpack('>I',data[pos:pos+4])[0]
  tag=data[pos+4:pos+8]; payload=data[pos+8:pos+8+length]
  crc=struct.unpack('>I',data[pos+8+length:pos+12+length])[0]
  assert zlib.crc32(tag+payload)&0xffffffff==crc, f'{size}: bad {tag} CRC'
  if tag==b'IHDR': assert struct.unpack('>II',payload[:8])==(size,size)
  if tag==b'IDAT': compressed+=payload
  if tag==b'IEND': ended=True
  pos+=12+length
 assert ended and pos==len(data)
 assert len(zlib.decompress(compressed))==size*(1+size*3)
 print(f'PASS PNG {size}: dimensions, chunk CRCs, full RGB decode')
html=(root/'index.html').read_text()
for path in re.findall(r'(?:src|href)="(\./[^"#?]+)"',html): assert (root/path).is_file(),path
manifest=json.loads((root/'manifest.webmanifest').read_text())
for icon in manifest['icons']: assert (root/icon['src']).is_file()
assert 'lang="de"' in html and 'maximum-scale' not in html
assert 'prefers-reduced-motion' in (root/'style.css').read_text()
print('PASS HTML links, manifest, language, zoom and reduced motion')
